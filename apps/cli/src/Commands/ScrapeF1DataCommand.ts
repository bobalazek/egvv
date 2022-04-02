import puppeteer from 'puppeteer';
import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';

import { processEventsForYear } from '../Utils/F1WebsiteHelpers';

export const addScrapeF1DataCommand = (program: Command) => {
  const command = program
    .command('scrape-f1-data')
    .requiredOption('-y, --year <year>', 'For what year?')
    .action(async (options: any) => {
      const browser = await puppeteer.launch();
      const prisma = new PrismaClient();

      const year = parseInt(options.year);

      await processEventsForYear(browser, prisma, year, `f1-${year}`);

      await browser.close();
    });
  program.addCommand(command);
};
