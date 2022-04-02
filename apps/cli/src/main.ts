import { Command } from 'commander';

import { addScrapeF1DataCommand } from './Commands/ScrapeF1DataCommand';

const program = new Command('CLI');

addScrapeF1DataCommand(program);

program.parse(process.argv);
