import { Command } from 'commander';
const program = new Command();

import getFiles from '../../services/recharge/theme/getFiles.js';
import inquirer from 'inquirer';
import list from '../../services/recharge/theme/list.js';

import getFile from '../../services/recharge/theme/getFile.js';

import fs from 'fs'
import path from 'path'

const THEME_PATH = path.resolve(process.cwd(), './theme')

const pull = program.command('pull')
  .description("Replaces your local theme files with a selected theme's remote theme files.")
  .action(async () => {

    if (!fs.existsSync(THEME_PATH)){
      fs.mkdirSync(THEME_PATH);
    }
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
          message: 'Please select the theme you would like to get the files of:',
          choices
        }
      ])
      .then( async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        const files = await getFiles(answers.theme.id)

        for (const file of files) {
          ui.updateBottomBar(`Pulling ${file.name}...`)
          const rawFile = await getFile(answers.theme.id, file.id).then(res => res.data)

          const FILE_PATH = path.resolve(THEME_PATH, file.name)
          fs.readFile(FILE_PATH, {encoding:'utf8', flag:'r'},
            function(err, data) {
              if(err){
                fs.appendFileSync(FILE_PATH, rawFile)
                return
              }

              fs.writeFileSync(FILE_PATH, rawFile);
            }
          );

        }

        ui.log.write(`Done! Pull from "${answers.theme.name}" is complete`)
        ui.updateBottomBar("")

      }).then(() => process.exit())
      .catch(err => console.log(err))
  });

export default pull