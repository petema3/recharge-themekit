#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

import auth from './commands/auth.js';
import copy from './commands/copy.js';
import deleteTheme from './commands/delete.js';
import docs from './commands/docs.js';
import newTheme from './commands/new.js'
import open from './commands/open.js'
import packageTheme from './commands/package.js';
import publish from './commands/publish.js';
import pull from './commands/pull.js';
import push from './commands/push.js';
import select from './commands/select.js';
import watch from './commands/watch.js'


program
  .name('rc-theme')
  .usage("[global options] command")
  .description('Command line tool to help bootstrap Recharge Theme Engine Development')
  .version('0.1.0');

program.addCommand(auth)
program.addCommand(copy)
program.addCommand(deleteTheme)
program.addCommand(docs)
program.addCommand(newTheme)
program.addCommand(open)
program.addCommand(packageTheme)
program.addCommand(publish)
program.addCommand(pull)
program.addCommand(push)
program.addCommand(select)
program.addCommand(watch)

program.configureHelp()

program.parse()