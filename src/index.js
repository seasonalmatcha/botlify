#!/usr/bin/env node
const inquirer = require('inquirer');
const events = require('./events');
const { generateCommand, generateEvent, generateProject } = require('./scaffold');

(async () => {
  const prompt = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to generate?',
      name: 'command',
      choices: [
        'Create a new project',
        'Generate command or event'
      ]
    },
    {
      type: 'input',
      when: ({ command }) => command === 'Create a new project',
      message: 'What would you like to call your project?',
      name: 'projectName',
      validate: (name) => name.length > 0,
      default: 'discord-bot'
    },
    {
      type: 'list',
      when: ({ command }) => command === 'Generate command or event',
      message: 'What do you want to generate?',
      name: 'generate',
      choices: [
        'Command',
        'Event'
      ]
    },
    {
      type: 'input',
      when: ({ generate }) => generate === 'Command',
      message: 'What is the name of the command?',
      name: 'commandName',
      validate: (name) => name.length > 0,
    },
    {
      type: 'checkbox',
      when: ({ generate }) => generate === 'Event',
      message: 'Whar event do you want to generate?',
      name: 'eventNames',
      choices: events
    }
  ]);

  if (prompt.command === 'Create a new project') {
    const cleanName = prompt.projectName.toLowerCase().replace(/\s+/g, '-');
    generateProject(cleanName);
  }
  else {
    if (prompt.commandName) {
      generateCommand(prompt.commandName);
    }
    else if (prompt.eventNames) {
      for (const event of prompt.eventNames) {
        generateEvent(events.find(x => x.name === event));
      }
    }
  }
})();