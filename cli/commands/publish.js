import { Command } from 'commander';
const program = new Command();

const publish = program.command('publish')
  .description('Publishes a selected theme.')
  .action(async () => {

  });

export default publish