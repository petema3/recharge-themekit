import { Command } from 'commander';
const program = new Command();

const copy = program.command('copy')
  .description('Duplicates a selected theme.')
  .action(async () => {

  });

export default copy