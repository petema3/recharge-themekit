import { Command } from 'commander';
const program = new Command();

const auth = program.command('auth')
  .description('Opens a browser tab to the RECHARGE_APP_URL defined in your .env file to retrieve a new session token')
  .action(async () => {

  });

export default auth