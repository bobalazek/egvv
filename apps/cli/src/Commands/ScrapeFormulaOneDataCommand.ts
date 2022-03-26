import puppeteer from 'puppeteer';
import { Command } from 'commander';
import { Prisma, PrismaClient } from '@prisma/client';

import { convertToDashCase } from '@egvv/shared';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program.command('scrape-formula-one-data').action(async () => {
    const browser = await puppeteer.launch();
    const prisma = new PrismaClient();

    const year = 2020;

    await processEventsForYear(browser, prisma, year, `${year}-formula-one-world-championship`);

    await browser.close();
  });
  program.addCommand(command);
};

/********** Functions **********/
async function processEventsForYear(
  browser: puppeteer.Browser,
  prisma: PrismaClient,
  year: number,
  seasonSlug: string
) {
  const page = await browser.newPage();
  page.goto(`https://www.formula1.com/en/racing/${year}.html`);

  console.log(`========== Getting events for ${year} ==========`);

  const events: EventWithSessionsInterface[] = [];

  const eventsList = await getEventsList(page, year);
  for (const event of eventsList) {
    if (!event.type.startsWith('round')) {
      continue;
    }

    console.log(`Getting event data for ${event.slug} ${year} ...`);

    const round = parseInt(event.type.replace('round ', ''));
    const eventData = await getEventData(browser, year, event.slug, round);
    const eventSessions = await getEventSessions(browser, year, event.slug);

    const sessions: EventSessionInterface[] = [];
    for (const eventSession of eventSessions) {
      const name = eventData.name + ' - ' + eventSession.name;
      const type = eventSession.type;
      if (type === 'qualifying') {
        for (let i = 1; i <= 3; i++) {
          sessions.push({
            name: name + ' ' + i,
            type: type + '-' + i,
            startAt: eventSession.startAt,
            endAt: eventSession.endAt,
          });
        }

        continue;
      }

      sessions.push({
        name,
        type,
        startAt: eventSession.startAt,
        endAt: eventSession.endAt,
      });
    }

    const finalEventData = {
      ...eventData,
      sessions,
    };

    events.push(finalEventData);

    await saveEvent(prisma, finalEventData, seasonSlug);

    console.log('----------');
  }

  return events;
}

async function getEventSessions(browser: puppeteer.Browser, year: number, event: string) {
  const page = await browser.newPage();
  page.goto(`https://www.formula1.com/en/racing/${year}/${event}/Timetable.html`);

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

    const startAt = new Date(
      Date.parse(`${parseInt(currentDateSplit[1])} ${currentDateSplit[2]} ${year} ${datesSplit[0]}`)
    );
    const endAt = new Date(
      Date.parse(`${parseInt(currentDateSplit[1])} ${currentDateSplit[2]} ${year} ${datesSplit[1]}`)
    );

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

async function getEventTableData(page: puppeteer.Page) {
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

async function getEventsList(page: puppeteer.Page, year: number) {
  await page.waitForSelector('.event-list');

  const events: EventsListInterface[] = [];

  const $events = await page.$$('.event-list .event-item-link');
  for (const $event of $events) {
    const href = await page.evaluate((el) => el.getAttribute('href'), $event);
    const slug = href.replace(`/en/racing/${year}/`, '').replace('.html', '');
    const $type = await $event.$('.card-title');
    const type = await page.evaluate((el) => el.textContent, $type);

    events.push({
      slug,
      type: type.toLowerCase(),
    });
  }

  return events;
}

async function getEventData(
  browser: puppeteer.Browser,
  year: number,
  slug: string,
  round: number
): Promise<EventInterface> {
  const url = `https://www.formula1.com/en/racing/${year}/${slug}.html`;
  const page = await browser.newPage();
  page.goto(url);

  await page.waitForSelector('.f1-race-hub--content');

  const $paragraphs = await page.$$('.f1-race-hub--content p');
  const text = await page.evaluate((el) => el.textContent, $paragraphs[0]);

  let regex =
    /up to speed with everything you need to know about the (.*), which takes place over (.*) laps of the (.*)-kilometre (.*) /gm;
  let matches = regex.exec(text);
  let lapsIndex = 2;
  let lapDistanceIndex = 3;
  let circuitNameIndex = 4;

  if (!matches) {
    regex =
      /up to speed with everything you need to know about the (.*), which takes place in (.*), over (.*) laps of the (.*)-kilometre (.*) /gm;
    matches = regex.exec(text);
    lapsIndex = 3;
    lapDistanceIndex = 4;
    circuitNameIndex = 2;
  }

  let lapDistance = parseInt(matches[lapDistanceIndex].replace('.', ''));

  // Exception for Sakihr 2020
  if (isNaN(lapDistance)) {
    const lapDistanceSplit = matches[lapDistanceIndex].split(' ');
    lapDistance = parseInt(lapDistanceSplit[lapDistanceSplit.length - 1].replace('.', ''));

    circuitNameIndex = lapDistanceIndex;
  }

  const laps = parseInt(matches[lapsIndex]);

  let name = matches[1];
  if (name.includes(',')) {
    name = name.split(',')[0];
  }

  let circuitName = matches[circuitNameIndex];
  if (circuitName.includes(',')) {
    circuitName = circuitName.split(',')[0];
  }
  if (circuitName.includes("'s")) {
    circuitName = circuitName.split("'s")[0];
  }
  if (circuitName.includes(' on ')) {
    circuitName = circuitName.split(' on ')[0];
  }
  if (circuitName.includes(' in ')) {
    circuitName = circuitName.split(' in ')[0];
  }

  // Exceptions
  if (circuitName === 'Imola') {
    circuitName = 'Imola Circuit';
  } else if (circuitName === 'Intercity Istanbul Park circuit') {
    circuitName = 'Intercity Istanbul Park';
  }

  const eventSlug = convertToDashCase(name);

  return {
    name,
    slug: eventSlug,
    round,
    laps,
    lapDistance,
    circuitName,
    url,
  };
}

async function saveEvent(prisma: PrismaClient, eventRawData: EventWithSessionsInterface, seasonSlug: string) {
  console.log(`Saving ${eventRawData.slug} event ...`);

  let raceAt: Date;
  for (const eventSessionData of eventRawData.sessions) {
    if (eventSessionData.type === 'race') {
      raceAt = eventSessionData.startAt;
      break;
    }
  }

  if (!raceAt) {
    console.error(`Could not find raceAt for ${eventRawData.name}`);

    process.exit(1);
  }

  const season = await prisma.season.findFirst({
    where: {
      slug: seasonSlug,
    },
  });
  if (!season) {
    console.error(`Season ${seasonSlug} not found`);

    process.exit(1);
  }

  const circuit = await prisma.circuit.findFirst({
    where: {
      name: eventRawData.circuitName,
    },
  });
  if (!circuit) {
    console.error(`Circuit ${eventRawData.circuitName} not found`);

    process.exit(1);
  }

  const finalData: Prisma.EventUncheckedCreateInput = {
    name: eventRawData.name,
    slug: eventRawData.slug,
    laps: eventRawData.laps,
    lapDistance: eventRawData.lapDistance,
    round: eventRawData.round,
    url: eventRawData.url,
    raceAt,
    seasonId: season.id,
    circuitId: circuit.id,
  };

  const event = await prisma.event.upsert({
    where: {
      slug: finalData.slug,
    },
    update: finalData,
    create: finalData,
  });

  console.log(`===== Event sessions for ${event.slug} =====`);

  for (const eventSessionData of eventRawData.sessions) {
    console.log(`Upserting ${eventSessionData.type} ...`);

    const eventSessionFinalData: Prisma.EventSessionUncheckedCreateInput = {
      name: eventSessionData.name,
      type: eventSessionData.type,
      startAt: eventSessionData.startAt,
      endAt: eventSessionData.endAt,
      eventId: event.id,
    };

    await prisma.eventSession.upsert({
      where: {
        eventId_type: {
          eventId: eventSessionFinalData.eventId,
          type: eventSessionFinalData.type,
        },
      },
      update: eventSessionFinalData,
      create: eventSessionFinalData,
    });
  }
}

/********** Interfaces **********/
interface EventInterface {
  name: string;
  slug: string;
  round: number;
  laps: number;
  lapDistance: number;
  circuitName: string;
  url: string;
}

interface EventWithSessionsInterface extends EventInterface {
  sessions: EventSessionInterface[];
}

interface EventsListInterface {
  slug: string;
  type: string;
}

interface EventSessionInterface {
  name: string;
  type: string;
  startAt: Date;
  endAt: Date;
}
