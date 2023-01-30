import { Command } from 'commander';
const program = new Command();

import getFiles from '../../services/recharge/theme/getFiles.js';
import inquirer from 'inquirer';
import list from '../../services/recharge/theme/list.js';

import editFile from '../../services/recharge/theme/editFile.js';
import newFile from '../../services/recharge/theme/newFile.js';

import fs from 'fs'
import path from 'path'

const THEME_PATH = path.resolve(process.cwd(), './theme')

const push = program.command('push')
  .description("Replaces a selected theme's remote theme files with your local theme files.")
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
          message: 'Please select the theme you would like to push your files to:',
          choices
        }
      ])
      .then( async (answers) => {
        const ui = new inquirer.ui.BottomBar();
        const files = await getFiles(answers.theme.id)

        const localFiles = fs.readdirSync(THEME_PATH)

        for (const filename of localFiles) {
          const data = fs.readFileSync(path.resolve(THEME_PATH, filename), {encoding:'utf8', flag:'r'});
          const remoteFileToUpdate = files.find(file => file.name === filename)?.id

          ui.updateBottomBar(`Pushing ${filename}...`)
          if(remoteFileToUpdate){
            await editFile(answers.theme.id, remoteFileToUpdate, data)
          }else{
            await newFile(answers.theme.id, filename, data)
          }
        }

        ui.log.write(`Done! Push from "${answers.theme.name}" is complete`)
        ui.updateBottomBar("")

      }).then(() => process.exit())
      .catch(err => console.log(err))
  });

export default push