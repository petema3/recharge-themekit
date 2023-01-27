import dotenv from 'dotenv'
dotenv.config()

import { Command } from 'commander';
const program = new Command();

import open from 'open'

const auth = program.command('auth')
  .description('Opens a browser tab to the RECHARGE_APP_URL defined in your .env file to retrieve a new session token')
  .action(async () => {
    await open(`${process.env.RECHARGE_APP_URL}/merchant/home`, {wait: true})
    process.exit()
  });

export default auth