# recharge-themekit

Log into recharge apps

Go into cookies, get `session` cookie.

Paste it into env

paste url into env, should be of the form https://dyode-boilerplate-sp.admin.rechargeapps.com

# Environment variables

This cli requires 2 environment variables. RECHARGE_APP_URL, which is just the url you go to when going to the recharge app from your platform's admin. And RECHARGE_SESSION_TOKEN which is manually retrieved from the `session` cookie while on the `RECHARGE_APP_URL`.

The `session` cookie is inaccessible from javascript since it is a http only cookie. So you just need to copy it manually from your browser.

```
RECHARGE_APP_URL=https://dyode-boilerplate-sp.admin.rechargeapps.com
RECHARGE_SESSION_TOKEN='xxxxxxxxxxxxxxxxxxxxxxxxx'
```

# Commands
  auth            Opens a browser tab to the RECHARGE_APP_URL defined in your .env file to retrieve a new session token
  clone           Duplicates a selected theme.
  delete          Deletes a selected theme. (Except the published one)
  new             Create a new theme using the Novum v5 template
  open            Opens a selected recharge theme in a new tab.
  package         Zips your theme directory and places it in the project's root directory.
  publish         Publishes a selected theme.
  pull            Replaces your local theme files with a selected theme's remote theme files.
  push            Replaces a selected theme's remote theme files with your local theme files.
  watch           Watch a directory and upload all file changes to recharge
  help [command]  display help for command
