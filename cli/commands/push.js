import { Command } from 'commander';
const program = new Command();

const push = program.command('push')
  .description("Replaces a selected theme's remote theme files with your local theme files.")
  .action(async () => {

  });

export default push