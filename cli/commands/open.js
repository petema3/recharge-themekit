import { Command } from 'commander';
const program = new Command();

import openTheme from '../../services/recharge/theme/open.js'
import list from '../../services/recharge/theme/list.js'
import inquirer from 'inquirer';

const ui = new inquirer.ui.BottomBar();

const open = program.command('open')
  .description('Opens a selected recharge theme in a new tab.')
  .action(async () => {

    const themes = await list().then(res => res.themes)

    const choices = themes.map(theme => {
      return {
        name: theme.name,
        value: theme
      }
    })

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'theme',
          message: 'Please select the theme you would like to open:',
          choices
        }
      ])
      .then( async (answers) => {
        ui.log.write(`Opening theme: "${answers.theme.name}" in browser! \n\n${answers.theme.preview_url}`)
        await openTheme(answers.theme.preview_url)
      })
  })


export default open