import { Command } from 'commander';

import { processEventsForYear } from '../Utils/F1WebsiteHelpers';

export const addScrapeF1DataCommand = (program: Command) => {
  const command = program
    .command('scrape-f1-data')
    .requiredOption('-y, --year <year>', 'For what year?')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .action(async (options: any) => {
      const year = parseInt(options.year);

      await processEventsForYear(year, `f1-${year}`);
    });
  program.addCommand(command);
};
