/* eslint-disable @typescript-eslint/no-explicit-any */

import { Command } from 'commander';
import puppeteer from 'puppeteer';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program
    .command('scrape-formula-one-data')
    .action(async (options: any) => {
      const sessions = await getSessionsFromTable(2020, 'Austria');

      console.log(sessions);
    });
  program.addCommand(command);
};

async function getSessionsFromTable(year: number, event: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.goto(
    `https://www.formula1.com/en/racing/${year}/${event}/Timetable.html`
  );

  const sessions = [];

  const table = await getTableDataForUrl(page);

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

async function getTableDataForUrl(page: puppeteer.Page) {
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
