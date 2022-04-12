import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';

import { convertToDashCase } from '@egvv/shared-helpers';
import { EventSessionInterface, EventsListInterface, EventWithSessionsInterface } from './Interfaces';
import { saveEvent } from './Helpers';

export async function processEventsForYear(
  browser: puppeteer.Browser,
  prisma: PrismaClient,
  year: number,
  seasonSlug: string
) {
  console.log(`========== Getting events for ${year} ==========`);

  const page = await browser.newPage();

  const url = `https://www.formula1.com/en/racing/${year}.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

  const eventsList = await getEventsList(page, year);
  for (const event of eventsList) {
    if (!event.type.startsWith('round')) {
      continue;
    }

    console.log(`Getting event data for ${event.slug} ${year} ...`);

    const round = parseInt(event.type.replace('round-', ''));
    const eventData = await getEventData(page, year, event.slug, round);

    await saveEvent(prisma, eventData, seasonSlug);

    console.log('----------');
  }

  /*
  // Uncomment this, if you want to get the JSON version to save it in a file
  console.log(
    JSON.stringify(
      (
        await prisma.event.findMany({
          where: {
            season: {
              slug: seasonSlug,
            },
          },
          include: {
            circuit: true,
            eventSessions: true,
          },
          orderBy: {
            round: 'asc',
          },
        })
      ).map((event) => {
        return {
          name: event.name,
          slug: event.slug,
          laps: event.laps,
          lapDistance: event.lapDistance,
          round: event.round,
          raceAt: event.raceAt.toISOString(),
          url: event.url,
          circuitLayout: event.circuitLayout,
          circuitSlug: event.circuit.slug,
          sessions: event.eventSessions.map((eventSession) => {
            return {
              name: eventSession.name,
              type: eventSession.type,
              startAt: eventSession.startAt.toISOString(),
              endAt: eventSession.endAt.toISOString(),
            };
          }),
        };
      })
    )
  );
  */

  return void 0;
}

// TODO: Keep in case we want some other data for other series
export async function getEventSessions(page: puppeteer.Page, year: number, event: string) {
  const url = `https://www.formula1.com/en/racing/${year}/${event}/Timetable.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

  const sessions: EventSessionInterface[] = [];

  const table = await getEventTableData(page);

  let currentDate = '';
  for (let i = 0; i < table.length; i++) {
    const row = table[i];

    if (!currentDate) {
      currentDate = row[0];
      continue;
    }

    const previousRow = table[i - 1];
    if (!previousRow) {
      continue;
    }

    if (!previousRow[0] && !previousRow[2] && !previousRow[2]) {
      currentDate = row[0];
      continue;
    }

    if (row.length !== 3 || (!row[0] && !row[2] && !row[2])) {
      continue;
    }

    if (row[0] !== 'Formula 1') {
      continue;
    }

    if (
      !row[1].startsWith('Practice') &&
      !row[1].startsWith('First Practice') &&
      !row[1].startsWith('Second Practice') &&
      !row[1].startsWith('Third Practice') &&
      !row[1].startsWith('Qualifying') &&
      !row[1].startsWith('Grand Prix') &&
      !row[1].startsWith('Sprint')
    ) {
      continue;
    }

    const datesSplit = row[2].replace(/\xA0/g, ' ').split(' - ');
    const currentDateSplit = currentDate.replace(/\xA0/g, ' ').split(' ');

    let startTime = datesSplit[0];
    let endTime = datesSplit[0];

    // There's a typo (https://www.formula1.com/en/racing/2021/Qatar/Timetable.html)
    // TODO: this data should probably be rather taken from the <script>
    if (startTime.includes(';')) {
      startTime = startTime.replace(';', ':');
    }

    if (endTime.includes(';')) {
      endTime = endTime.replace(';', ':');
    }

    const startAt = new Date(
      Date.parse(`${parseInt(currentDateSplit[1])} ${currentDateSplit[2]} ${year} ${startTime}`)
    );
    const endAt = new Date(Date.parse(`${parseInt(currentDateSplit[1])} ${currentDateSplit[2]} ${year} ${endTime}`));

    let name = row[1];
    if (name.startsWith('Sprint')) {
      name = 'Sprint';
    } else if (name.startsWith('Grand Prix')) {
      name = 'Race';
    } else if (name === 'First Practice Session' || name === 'Practice Session') {
      name = 'Practice 1';
    } else if (name === 'Second Practice Session') {
      name = 'Practice 2';
    } else if (name === 'Third Practice Session') {
      name = 'Practice 3';
    } else if (name === 'Qualifying Session') {
      name = 'Qualifying';
    }

    const type = convertToDashCase(name);

    sessions.push({
      name,
      type,
      startAt,
      endAt,
    });
  }

  return sessions;
}

export async function getEventTableData(page: puppeteer.Page) {
  await page.waitForSelector('.article-content');

  const table: string[][] = [];
  const $table = await page.$('.article-content table');
  const $tableRows = await $table.$$('tbody tr');
  for (const $tableRow of $tableRows) {
    const row = [];

    const $tableRowData = await $tableRow.$$('td');

    for (const $single of $tableRowData) {
      const value = await page.evaluate((el) => el.textContent, $single);
      row.push(value.trim());
    }

    table.push(row);
  }

  return table;
}

export async function getEventsList(page: puppeteer.Page, year: number) {
  await page.waitForSelector('.event-list');

  const events: EventsListInterface[] = [];

  const $events = await page.$$('.event-list .event-item-link');
  for (const $event of $events) {
    const href = await page.evaluate((el) => el.getAttribute('href'), $event);
    const slug = href.replace(`/en/racing/${year}/`, '').replace('.html', '');
    const $type = await $event.$('.card-title');

    let type = await page.evaluate((el) => el.textContent, $type);
    if (type.includes('-')) {
      type = type.split('-')[0].trim();
    }

    events.push({
      slug,
      type: convertToDashCase(type),
    });
  }

  return events;
}

export async function getEventData(
  page: puppeteer.Page,
  year: number,
  slug: string,
  round: number
): Promise<EventWithSessionsInterface> {
  // Summary page
  const url = `https://www.formula1.com/en/racing/${year}/${slug}.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

  await page.waitForSelector('.race-hub-wrapper');

  const $script = await page.$('script[type="application/ld+json"]');
  const script = await page.evaluate((el) => el.innerText, $script);
  const parsedScript = JSON.parse(script);

  const name = year + ' ' + parsedScript.subEvent[0].name.split(' - ')[1];

  await page.waitForSelector('.f1-race-hub--timetable-links-wrapper');

  const $circuitName = await page.$('.f1-race-hub--timetable-links-wrapper .misc--tag');
  let circuitName = await page.evaluate((el) => el.textContent, $circuitName);

  let circuitLayout: string | null = null;

  // Circuit page
  const circuitUrl = `https://www.formula1.com/en/racing/${year}/${slug}/Circuit.html`;

  console.log(`Goto URL: ${circuitUrl} ...`);

  page.goto(circuitUrl);

  await page.waitForSelector('.f1-race-hub--map');

  const $stats = await page.$$('.f1-race-hub--map .f1-stat .f1-bold--stat');

  const lapsStat = await page.evaluate((el) => el.textContent, $stats[1]);
  const laps = parseInt(lapsStat);

  const lapDistanceStat = await page.evaluate((el) => el.textContent, $stats[2]);
  const lapDistance = parseInt(lapDistanceStat.replace('.', ''));

  // Exceptions
  if (circuitName === 'Imola' || circuitName === 'Autodromo Enzo e Dino Ferrari') {
    circuitName = 'Imola Circuit';
  } else if (circuitName === 'Mugello') {
    circuitName = 'Autodromo Internazionale del Mugello';
  } else if (circuitName === 'Intercity Istanbul Park circuit') {
    circuitName = 'Intercity Istanbul Park';
  } else if (circuitName === 'Melbourne Grand Prix Circuit') {
    circuitName = 'Albert Park Circuit';
  } else if (circuitName === 'Autódromo José Carlos Pace') {
    circuitName = 'Interlagos Circuit';
  } else if (circuitName === 'Nurburgring') {
    circuitName = 'Nürburgring';
  } else if (circuitName === 'Bahrain International Circuit – Outer Track') {
    circuitName = 'Bahrain International Circuit';
    circuitLayout = 'Outer Track';
  }

  const eventSlug = convertToDashCase(name);

  const sessions: EventSessionInterface[] = [];
  for (const eventSession of parsedScript.subEvent) {
    const eventSessionNameSplit = eventSession.name.split(' - ');
    const eventSessionName = name + ' - ' + eventSessionNameSplit[0];
    const type = convertToDashCase(eventSessionNameSplit[0]);

    if (type === 'qualifying') {
      for (let i = 1; i <= 3; i++) {
        sessions.push({
          name: eventSessionName + ' ' + i,
          type: type + '-' + i,
          startAt: new Date(eventSession.startDate),
          endAt: new Date(eventSession.endDate),
        });
      }

      continue;
    }

    sessions.push({
      name: eventSessionName,
      type,
      startAt: new Date(eventSession.startDate),
      endAt: new Date(eventSession.startDate),
    });
  }

  return {
    name,
    slug: eventSlug,
    round,
    laps,
    lapDistance,
    circuitName,
    circuitLayout,
    url,
    sessions,
  };
}
