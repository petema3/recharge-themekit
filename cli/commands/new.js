import { Command } from 'commander';
const program = new Command();

import newTheme from '../../services/recharge/theme/new.js'
import inquirer from 'inquirer'

const createNewTheme = program.command('new')
  .description('Create a new theme using the Novum v5 template')
  .action(async () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the name of this new theme:'
        }
      ])
      .then(async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        ui.log.write(`Creating a new theme named: "${answers.name}"...`)
        await newTheme(answers.name)
        ui.log.write(`Done! "${answers.name}" has been created.`)
      }).then(() => process.exit())
      .catch(err => console.log(err))
  })


export default createNewTheme