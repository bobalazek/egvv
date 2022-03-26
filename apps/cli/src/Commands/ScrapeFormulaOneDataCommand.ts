import puppeteer from 'puppeteer';
import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';

import { processEventsForYear } from '../Utils/Helpers';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program
    .command('scrape-formula-one-data')
    .requiredOption('-y, --year <year>', 'For what year?')
    .action(async (options: any) => {
      const browser = await puppeteer.launch();
      const prisma = new PrismaClient();

      const year = parseInt(options.year);

      await processEventsForYear(browser, prisma, year, `${year}-formula-one-world-championship`);

      await browser.close();
    });
  program.addCommand(command);
};
