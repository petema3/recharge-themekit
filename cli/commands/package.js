import { Command } from 'commander';
const program = new Command();

import list from '../../services/recharge/theme/list.js';
import inquirer from 'inquirer';
import zipper from 'zip-local';

const packageTheme = program.command('package')
  .description("Zips your theme directory and places it in the project's root directory.")
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
          message: 'Please select the theme you would like to zip:',
          choices
        }
      ])
      .then( async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        ui.log.write(`Zipping theme: "${answers.theme.name}"...`)
        zipper.sync.zip(`${process.cwd()}/theme/`).compress().save("theme.zip");
        ui.log.write(`Done! Zipped "${answers.theme.name}"`);
        process.exit()
      })
  });

export default packageTheme