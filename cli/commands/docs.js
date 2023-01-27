import { Command } from 'commander';
const program = new Command();

const docs = program.command('docs')
  .description("Opens a browser tab to this cli's documentation")
  .action(async () => {
    console.log('No Docs link yet! Oopsie')
  });

export default docs