# recharge-themekit

Log into recharge apps

Go into cookies, get `session` cookie.

Paste it into env

paste url into env, should be of the form https://dyode-boilerplate-sp.admin.rechargeapps.com

paste theme files into a folder labeled `theme` in the root directory (this will be extracted into a package later, but for now it needs to be in the root directory)

`node cli/index.js new` to generate the build files and create a new theme for dev, *NEED to do*

`node cli/index.js select` to select the theme you would like to work on

`node cli/index.js watch` to watch the `theme` folder for changes
