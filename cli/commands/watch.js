import { Command } from 'commander';
const program = new Command();
import path from 'path'
import fs from 'fs'

import chokidar from 'chokidar';

import deleteFile from '../../services/recharge/theme/deleteFile.js';
import inquirer from 'inquirer';
import getFiles from '../../services/recharge/theme/getFiles.js';
import editFile from '../../services/recharge/theme/editFile.js';
import list from '../../services/recharge/theme/list.js';
import chalk from 'chalk'
import newFile from '../../services/recharge/theme/newFile.js';

const THEME_PATH = path.resolve(process.cwd(), './theme')

let watchedThemeFiles = []

const handleChangedFile = async (filePath, watchedTheme) => {
  const ui = new inquirer.ui.BottomBar();
  const fileName = path.basename(filePath)
  const source = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

  const fileToUpdate = watchedThemeFiles.find(file => file.name === fileName).id
  await editFile(watchedTheme.id, fileToUpdate, source)
  ui.log.write(`> Updated ${chalk.cyan(fileName)}`)
}

const handleAddedFile = async (filePath, watchedTheme) => {
  const ui = new inquirer.ui.BottomBar();
  const fileName = path.basename(filePath)
  const source = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  await newFile(watchedTheme.id, fileName, source)
  watchedThemeFiles = await getFiles(watchedTheme.id)
  ui.log.write(`> Added ${chalk.cyan(fileName)}`)
}

const handleRemovedFile = async (filePath, watchedTheme) => {
  const ui = new inquirer.ui.BottomBar();
  const fileName = path.basename(filePath)
  const fileToDelete = watchedThemeFiles.find(file => file.name === fileName).id
  await deleteFile(watchedTheme.id, fileToDelete)
  watchedThemeFiles = await getFiles(watchedTheme.id)
  ui.log.write(`> Deleted ${chalk.cyan(fileName)}`)
}

const handleReady = (watchedTheme) => {
  const ui = new inquirer.ui.BottomBar();
  ui.log.write(`> Now listening for changes to be uploaded to: ${chalk.cyan(watchedTheme.name)}`)
}

const watch = program.command('watch')
  .description('Watch a directory and upload all file changes to recharge')
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
          message: 'Please select the theme you would like to upload to during watch:',
          choices
        }
      ])
      .then( async (answers) => {
        const watchedTheme = answers.theme
        watchedThemeFiles = await getFiles(answers.theme.id)

        const watcher = chokidar.watch(THEME_PATH, {
          ignored: /(^|[\/\\])\../, // ignore dotfiles
          persistent: true,
          ignoreInitial: true
        });

        watcher
          .on('add', filePath => handleAddedFile(filePath, watchedTheme))
          .on('change', filePath => handleChangedFile(filePath, watchedTheme))
          .on('unlink', filePath => handleRemovedFile(filePath, watchedTheme))
          .on('ready', () => handleReady(watchedTheme));
      })
  });

export default watch