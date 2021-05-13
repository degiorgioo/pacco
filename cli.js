#!/usr/bin/env node

const {
  inquirerPromptConfiguration,
  handleAnswer,
  handleError,
} = require("./src/inquirer-configurator");
const inquirer = require("inquirer");
const inquirerSearchList = require("inquirer-search-list");

/**
 * Register search list inquirer plugin.
 */
inquirer.registerPrompt("search-list", inquirerSearchList);

/**
 * Configure inquirer prompt.
 */
inquirer
  .prompt(inquirerPromptConfiguration)
  .then(handleAnswer)
  .catch(handleError);
