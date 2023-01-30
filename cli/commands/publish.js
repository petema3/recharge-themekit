import { Command } from 'commander';
const program = new Command();

import inquirer from 'inquirer';
import list from '../../services/recharge/theme/list.js';
import publish from '../../services/recharge/theme/publish.js';

const publishCommand = program.command('publish')
  .description('Publishes a selected theme.')
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
          message: 'Please select the theme you would like to publish:',
          choices
        }
      ])
      .then( async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        if(answers.theme.active){
          ui.log.write(`"${answers.theme.name}" is already published`)
          process.exit()
        }

        ui.log.write(`Publishing theme: "${answers.theme.name}"...`)
        await publish(answers.theme.id)
        ui.log.write(`Done! Published theme "${answers.theme.name}"`)
      }).then(() => process.exit())
      .catch(err => console.log(err))
  });

export default publishCommand