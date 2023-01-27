import { Command } from 'commander';
const program = new Command();

import inquirer from 'inquirer'
import list from '../../services/recharge/theme/list.js'
import clone from '../../services/recharge/theme/clone.js';
import setLatestTheme from '../../services/cache/setLatestTheme.js';

const ui = new inquirer.ui.BottomBar();

const cloneCommand = program.command('clone')
  .description('Duplicates a selected theme.')
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
          message: 'Please select the theme you would like to duplicate:',
          choices
        },
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the name of this new theme:'
        }
      ])
      .then( async (answers) => {

        const { theme, name } = answers

        ui.log.write(`Duplicating theme...`)
        const newTheme = await clone(theme.id, name).then(res => res.data)
        ui.log.write(`Done! Duplicated "${theme.name}" to "${newTheme.theme.name}"`)

        inquirer.prompt([{
          type: 'confirm',
          name: 'switch',
          message: `Switch current theme to "${theme.name}"?`,
          default: true
        }]).then(answers => {
          if(answers.switch){
            setLatestTheme(newTheme.theme.id)
            ui.log.write(`Done! Switched current theme to "${theme.name}"`)
          }
        })
      })
  });

export default cloneCommand