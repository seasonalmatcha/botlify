const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chalk = require('chalk');
const symbols = require('log-symbols');

const BASE_EVENT_URL = 'https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateBotlifyFile(dir, name) {
  const str = `{
  "project": "${name}",
  "lib-verion": {
    "discord.js": "12.2.0",
    "dotenv": "8.2.0"
  }
}
`
  fs.writeFileSync(path.join(dir, 'botlify.json'), str);
}

function generateConfigFile(dir) {
  const str = `module.exports = {
  TOKEN: process.env.TOKEN,
  PREFIX: process.env.PREFIX
}
`

  fs.writeFileSync(path.join(dir, 'config.js'), str);
}

function generateEnvFile(dir) {
  const str = `TOKEN=
PREFIX=
`

  fs.writeFileSync(path.join(dir, '.env'), str);
}

function generateMainFile(dir) {
  const str = `require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('./config');
const client = new Client();

(async () => {
  client.config = config;
  client.aliases = new Map();
  client.commands = new Map();
  client.events = new Map();

  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(client.config.TOKEN);
})();
`

  fs.writeFileSync(path.join(dir, 'index.js'), str);
}

function generatePackageJSON(dir, name) {
  const str = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "discord.js": "12.2.0",
    "dotenv": "8.2.0"
  }
}
`

  fs.writeFileSync(path.join(dir, 'package.json'), str);
}

function generatePingCommand(dir) {
  const str = `const BaseCommand = require('../utils/structures/BaseCommand');

class PingCommand extends BaseCommand {
  constructor() {
    super('${name}', []);
  }

  async run(client, message, args) {
    message.channel.send('Pong!');
  }
}

module.exports = ${capitalize(name)}Command;
`
  fs.writeFileSync(path.join(dir, 'PingCommand.js'), str);
}

function generateReadyEvent(dir) {
  const str = `// ${BASE_EVENT_URL}${name}
const BaseEvent = require('../utils/structures/BaseEvent');

class ReadyEvent extends BaseEvent {
  constructor() {
    super('${name}');
  }

  async run(client) {
    console.log(\`\${client.user.tag} has logged in\`);
  }
}

module.exports = ReadyEvent;
`
  fs.writeFileSync(path.join(dir, 'ReadyEvent.js'), str);
}

function generateUtilFiles(dir) {
  const registry = `
const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias) => {
          client.aliases.set(alias, cmd.name);
        });
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = {
  registerCommands,
  registerEvents
};
`

  const baseCommand = `class BaseCommand {
  constructor(name, aliases) {
    this.name = name;
    this.aliases = aliases;
  }
}

module.exports = BaseCommand;
`

  const baseEvent = `module.exports = class BaseEvent {
  constructor(name) {
    this.name = name;
  }
}
`

  fs.writeFileSync(path.join(dir, 'registry.js'), registry);
  fs.writeFileSync(path.join(dir, 'structures', 'BaseCommand.js'), baseCommand);
  fs.writeFileSync(path.join(dir, 'structures', 'BaseEvent.js'), baseEvent);
}

function generateCommand(name, cwd = process.cwd()) {
  const dir = path.join(cwd, 'src', 'commands');

  if (fs.existsSync(path.join(dir, `${capitalize(name)}Command.js`)))
    return console.log(symbols.error + chalk.red(` Command ${chalk.black.bgRed(name)} already exist`));

  str = `const BaseCommand = require('../utils/structures/BaseCommand');

class ${capitalize(name)}Command extends BaseCommand {
  constructor() {
    super('${name}', []);
  }

  async run(client, message, args) {

  }
}

module.exports = ${capitalize(name)}Command;
`
  fs.writeFileSync(path.join(dir, `${capitalize(name)}Command.js`), str);
  console.log(symbols.success + chalk.green(` Created command ${name}`));
}

function generateEvent({ name, params }, cwd = process.cwd()) {
  const dir = path.join(cwd, 'src', 'events');
  if (fs.existsSync(path.join(dir, `${capitalize(name)}Event.js`)))
    return console.log(symbols.error + chalk.red(` Command ${chalk.black.bgRed(name)} already exist`));

  const str = `// ${BASE_EVENT_URL}${name}
const BaseEvent = require('../utils/structures/BaseEvent');

class ${capitalize(name)}Event extends BaseEvent {
  constructor() {
    super('${name}');
  }

  async run(client${params ? `, ${params}` : ''}) {

  }
}

module.exports = ${capitalize(name)}Event;
`
  fs.writeFileSync(path.join(dir, `${capitalize(name)}Event.js`), str);
  console.log(symbols.success + chalk.green(` Created event ${name}`));
}

function generateProject(name) {
  const projectPath = path.join(process.cwd(), name);

  if (fs.existsSync(projectPath))
    return console.log(symbols.error + chalk.red(` Directory with name ${chalk.black.bgRed(name)} already exist`));

  console.log(symbols.info + chalk.cyan(' Generating a new project ...'));

  const srcPath = path.join(projectPath, 'src');
  const utilsPath = path.join(srcPath, 'utils');
  const commandsPath = path.join(srcPath, 'commands');
  const eventsPath = path.join(srcPath, 'events');
  const structurePath = path.join(utilsPath, 'structures');

  fs.mkdirSync(projectPath);
  fs.mkdirSync(srcPath);
  fs.mkdirSync(utilsPath);
  fs.mkdirSync(commandsPath);
  fs.mkdirSync(eventsPath);
  fs.mkdirSync(structurePath);

  generateBotlifyFile(projectPath, name);
  generateConfigFile(srcPath);
  generateEnvFile(projectPath);
  generateMainFile(srcPath);
  generatePackageJSON(projectPath, name);
  generatePingCommand(commandsPath);
  generateReadyEvent(eventsPath);
  generateUtilFiles(utilsPath);

  console.log(symbols.info + chalk.cyan(' Installing dependencies ...'));
  execSync('npm install', { cwd: projectPath });
  console.log(symbols.success + chalk.green(` Project ${name} has been created`));
  console.log(chalk.green(`\n\tGet into the project directory by typing ${chalk.underline('cd ./' + name)}`));
  console.log(chalk.green(`\tTo run, type ${chalk.underline('npm start')}`));
}

module.exports = {
  generateCommand,
  generateEvent,
  generateProject
}