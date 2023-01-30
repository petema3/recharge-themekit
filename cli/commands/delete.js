import { Command } from 'commander';
const program = new Command();

import inquirer from 'inquirer'
import list from '../../services/recharge/theme/list.js'

import deleteTheme from '../../services/recharge/theme/delete.js';

const deleteThemeCommand = program.command('delete')
  .description('Deletes a selected theme. (Except the published one)')
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
          message: 'Please select the theme you would like to delete:',
          choices
        }
      ])
      .then( async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        if(answers.theme.active){
          ui.log.write(`"${answers.theme.name}" is the live theme and can not be deleted.`)
          process.exit()
        }

        ui.log.write(`Deleting "${answers.theme.name}"...`)
        await deleteTheme(answers.theme.id)
        ui.log.write(`Done! "${answers.theme.name}" has been deleted.`)
      }).then(() => process.exit())
      .catch(err => console.log(err))
  });

export default deleteThemeCommand