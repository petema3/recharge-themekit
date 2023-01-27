import { Command } from 'commander';
const program = new Command();

const docs = program.command('docs')
  .description("Opens a browser tab to this cli's documentation")
  .action(async () => {

  });

export default docs