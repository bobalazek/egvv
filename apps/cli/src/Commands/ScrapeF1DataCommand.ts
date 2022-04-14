import { Command } from 'commander';
import slugify from 'slugify';

import { processEventsForYear } from '../Utils/F1WebsiteHelpers';

export const addScrapeF1DataCommand = (program: Command) => {
  const command = program
    .command('scrape-f1-data')
    .requiredOption('-y, --year <year>', 'For what year?')
    .option('-e, --event <event>', 'For which event?')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .action(async (options: any) => {
      const year = parseInt(options.year);
      const event = slugify(options.event ?? '', {
        lower: true,
      });

      await processEventsForYear(year, `f1-${year}`, event);
    });
  program.addCommand(command);
};
