import { Command } from 'commander';
const program = new Command();

const packageTheme = program.command('package')
  .description("Zips your theme directory and places it in the project's root directory.")
  .action(async () => {

  });

export default packageTheme