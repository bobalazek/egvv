/* eslint-disable @typescript-eslint/no-explicit-any */

import { Command } from 'commander';
import puppeteer from 'puppeteer';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program
    .command('scrape-formula-one-data')
    .action(async (options: any) => {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      page.goto(
        'https://www.formula1.com/en/racing/2020/Austria/Timetable.html'
      );

      await page.waitForSelector('.article-content');

      // TODO

      await browser.close();
    });
  program.addCommand(command);
};
