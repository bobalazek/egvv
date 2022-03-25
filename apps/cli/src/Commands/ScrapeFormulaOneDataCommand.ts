/* eslint-disable @typescript-eslint/no-explicit-any */

import { Command } from 'commander';
import puppeteer from 'puppeteer';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program
    .command('scrape-formula-one-data')
    .action(async (options: any) => {
      const browser = await puppeteer.launch();

      const events = await getEventsForYear(browser, 2020);
      const sessions = await getSessionsFromTable(browser, 2020, 'Austria');
    });
  program.addCommand(command);
};

async function getEventsForYear(browser: puppeteer.Browser, year: number) {
  const page = await browser.newPage();
  page.goto(`https://www.formula1.com/en/racing/${year}.html`);

  const events: any[] = [];

  const eventsList = await getEventsList(page, year);
  for (const event of eventsList) {
    if (!event.type.startsWith('round')) {
      continue;
    }

    const eventData = await getEventDataFromUrl(browser, year, event.slug);

    events.push({
      ...eventData,
      round: parseInt(event.type.replace('round ', '')),
    });
  }

  console.log(events);

  return events;
}

async function getSessionsFromTable(
  browser: puppeteer.Browser,
  year: number,
  event: string
) {
  const page = await browser.newPage();
  page.goto(
    `https://www.formula1.com/en/racing/${year}/${event}/Timetable.html`
  );

  const sessions: { name: string; startDate: Date; endDate: Date }[] = [];

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
      !row[1].startsWith('Qualifying') &&
      !row[1].startsWith('Grand Prix') &&
      !row[1].startsWith('Sprint')
    ) {
      continue;
    }

    const datesSplit = row[2].split(' - ');
    const currentDateSplit = currentDate.split(' ');

    const startDate = new Date(
      Date.parse(
        `${parseInt(currentDateSplit[1])} ${parseInt(
          currentDateSplit[1]
        )} ${year} ${datesSplit[0]}`
      )
    );
    const endDate = new Date(
      Date.parse(
        `${parseInt(currentDateSplit[1])} ${parseInt(
          currentDateSplit[1]
        )} ${year} ${datesSplit[1]}`
      )
    );

    let name = row[1];
    if (name.startsWith('Sprint')) {
      name = 'Sprint';
    }
    if (name.startsWith('Grand Prix')) {
      name = 'Race';
    }

    sessions.push({
      name,
      startDate,
      endDate,
    });
  }

  await browser.close();

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

  const events: { slug: string; type: string }[] = [];

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

async function getEventDataFromUrl(
  browser: puppeteer.Browser,
  year: number,
  slug: string
) {
  const page = await browser.newPage();
  page.goto(`https://www.formula1.com/en/racing/${year}/${slug}.html`);

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
    lapDistance = parseInt(
      lapDistanceSplit[lapDistanceSplit.length - 1].replace('.', '')
    );

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

  return {
    name,
    laps,
    lapDistance,
    circuitName,
  };
}
