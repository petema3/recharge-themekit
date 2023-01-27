import { Command } from 'commander';
const program = new Command();

const pull = program.command('pull')
  .description("Replaces your local theme files with a selected theme's remote theme files.")
  .action(async () => {

  });

export default pull