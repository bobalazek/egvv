/* eslint-disable @typescript-eslint/no-inferrable-types */

import puppeteer from 'puppeteer';
import slugify from 'slugify';

import {
  EventRaceInterface,
  EventRaceResultInterface,
  EventSessionInterface,
  EventsListInterface,
  EventWithSessionsInterface,
} from './Interfaces';
import { convertTimeToMilliseconds, saveEvent, saveEventRaceResults } from './Helpers';

export const processEventsForYear = async (year: number, seasonSlug: string, eventSlug?: string) => {
  console.log(`========== Getting events for ${year} ==========`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('========== Processing events ==========');
  const eventsList = await getEventsList(page, year);
  for (const event of eventsList) {
    if (eventSlug && eventSlug !== event.slug) {
      continue;
    }

    console.log(`Getting event data for ${event.slug} ${year} ...`);

    const round = parseInt(event.type.replace('round-', ''));
    const eventData = await getEventData(page, year, event.slug, round);

    await saveEvent(eventData, seasonSlug);

    console.log('----------');
  }

  console.log('========== Processing event races ==========');
  const eventsRaces = await getEventsRaces(page, year);
  for (const eventRace of eventsRaces) {
    const eventRaceSlug = slugify(eventRace.name, {
      lower: true,
    });
    if (eventSlug && eventSlug !== eventRaceSlug) {
      continue;
    }

    const eventRaceResults = await getEventsRaceResults(page, eventRace.url);

    await saveEventRaceResults(eventRace, eventRaceResults, year);

    console.log('----------');
  }

  await browser.close();

  return void 0;
};

// Keep in case we want some other data for other series
export const getEventSessions = async (page: puppeteer.Page, year: number, eventSlug: string) => {
  const table = await getEventTableData(page, year, eventSlug);
  const sessions: EventSessionInterface[] = [];

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

    const type = slugify(name, {
      lower: true,
    });

    sessions.push({
      name,
      type,
      startAt,
      endAt,
    });
  }

  return sessions;
};

export const getEventTableData = async (page: puppeteer.Page, year: number, eventSlug: string) => {
  const url = `https://www.formula1.com/en/racing/${year}/${eventSlug}/Timetable.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

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
};

export const getEventsList = async (page: puppeteer.Page, year: number, racesOnly: boolean = true) => {
  const url = `https://www.formula1.com/en/racing/${year}.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

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

    type = slugify(type, {
      lower: true,
    });

    if (racesOnly && !type.startsWith('round')) {
      continue;
    }

    events.push({
      slug,
      type,
    });
  }

  return events;
};

export const getEventData = async (
  page: puppeteer.Page,
  year: number,
  urlSlug: string,
  round: number
): Promise<EventWithSessionsInterface> => {
  // Summary page
  const url = `https://www.formula1.com/en/racing/${year}/${urlSlug}.html`;

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
  const circuitUrl = `https://www.formula1.com/en/racing/${year}/${urlSlug}/Circuit.html`;

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

  const slug = slugify(name, {
    lower: true,
  });

  const sessions: EventSessionInterface[] = [];
  for (const eventSession of parsedScript.subEvent) {
    const eventSessionNameSplit = eventSession.name.split(' - ');
    const eventSessionName = name + ' - ' + eventSessionNameSplit[0];
    const type = slugify(eventSessionNameSplit[0], {
      lower: true,
    });

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
    slug,
    round,
    laps,
    lapDistance,
    circuitName,
    circuitLayout,
    url,
    sessions,
  };
};

export const getEventsRaces = async (page: puppeteer.Page, year: number): Promise<EventRaceInterface[]> => {
  const url = `https://www.formula1.com/en/results.html/${year}/races.html`;

  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

  await page.waitForSelector('.resultsarchive-table');

  const eventRaces: EventRaceInterface[] = [];
  const $table = await page.$('.resultsarchive-table');
  const $tableRows = await $table.$$('tbody tr');
  for (const $tableRow of $tableRows) {
    let name: string = '';
    let url: string = '';
    let date: Date = new Date();
    let laps: number = 0;

    const $tableRowData = await $tableRow.$$('td');
    for (let i = 0; i < $tableRowData.length; i++) {
      const $single = $tableRowData[i];

      if (i === 1) {
        name = (await page.evaluate((el) => el.textContent, $single)).trim();

        const $a = await $single.$('a');
        url = await page.evaluate((el) => el.href, $a);
      } else if (i === 2) {
        const dateString = await page.evaluate((el) => el.textContent, $single);
        date = new Date(dateString); // TODO: annoying timezone stuff ...
      } else if (i === 5) {
        laps = parseInt(await page.evaluate((el) => el.textContent, $single));
      }
    }

    eventRaces.push({
      name,
      url,
      date,
      laps,
    });
  }

  return eventRaces;
};

export const getEventsRaceResults = async (page: puppeteer.Page, url: string): Promise<EventRaceResultInterface[]> => {
  console.log(`Goto URL: ${url} ...`);

  page.goto(url);

  await page.waitForSelector('.resultsarchive-table');

  let timeFirstPosition: number = 0;
  const results: EventRaceResultInterface[] = [];
  const $table = await page.$('.resultsarchive-table');
  const $tableRows = await $table.$$('tbody tr');
  for (const $tableRow of $tableRows) {
    let driverNumber: number = 0;
    let driverCode: string = '';
    let teamName: string = '';
    let status: string = 'FINISHED';
    let position: number | null = null;
    let timeMilliseconds: number | null = null;
    let laps: number | null = null;
    let lapsBehind: number | null = null;
    let points: number | null = null;

    const $tableRowData = await $tableRow.$$('td');
    for (let i = 0; i < $tableRowData.length; i++) {
      const $single = $tableRowData[i];
      const value = (await page.evaluate((el) => el.textContent, $single)).trim();

      if (i === 1) {
        position = value === 'NC' ? null : parseInt(value);
      } else if (i === 2) {
        driverNumber = parseInt(value);
      } else if (i === 3) {
        const $code = await $single.$('.hide-for-desktop');

        driverCode = await page.evaluate((el) => el.textContent, $code);
      } else if (i === 4) {
        teamName = value;
      } else if (i === 5) {
        laps = parseInt(value);
      } else if (i === 6) {
        if (value === 'DNF' || value === 'DNS') {
          status = value;
        } else {
          if (value.includes('lap')) {
            lapsBehind = parseInt(value.replace(' laps', '').replace(' lap', '').replace('+', ''));
          } else {
            if (!timeFirstPosition) {
              timeFirstPosition = convertTimeToMilliseconds(value);
              timeMilliseconds = timeFirstPosition;
            } else if (value.includes('+') && value.includes('s')) {
              const timeSplit = value.replace('+', '').replace('s', '').split('.');

              timeMilliseconds = timeFirstPosition + parseInt(timeSplit[1]) + parseInt(timeSplit[0]) * 1000;
            }
          }
        }
      } else if (i === 7) {
        points = parseFloat(value);
      }
    }

    results.push({
      driverNumber,
      driverCode,
      teamName,
      status,
      position,
      timeMilliseconds,
      laps,
      lapsBehind,
      points,
    });
  }

  return results;
};
