import { Command } from 'commander';
const program = new Command();

const deleteTheme = program.command('delete')
  .description('Deletes a selected theme')
  .action(async () => {

  });

export default deleteTheme