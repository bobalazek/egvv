import { Command } from 'commander';

import { addScrapeFormulaOneDataCommand } from './Commands/ScrapeFormulaOneDataCommand';

const program = new Command('CLI');

addScrapeFormulaOneDataCommand(program);

program.parse(process.argv);
