/* eslint-disable @typescript-eslint/no-explicit-any */

import { Command } from 'commander';

export const addScrapeFormulaOneDataCommand = (program: Command) => {
  const command = program
    .command('scrape-formula-one-data')
    .action(async (options: any) => {
      // TODO
    });

  program.addCommand(command);
};
