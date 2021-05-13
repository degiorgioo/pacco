const { runCommand } = require("./command-runner");
const { readPackageJson } = require("./file-resolver");
const { red, yellow, blue, pink } = require("./color");

/**
 * Defaults.
 */
const PROMPT_NAME = "command";
const PROMPT_PAGE_SIZE = 10;

/**
 * Creates the choices by the given scripts defined in the package.json file.
 *
 * @returns an array of { name: '', value: '' } pairs.
 */
const createChoicesByRunScriptConfiguration = () => {
  try {
    const packageJsonFileAsJson = readPackageJson();

    return Object.entries(packageJsonFileAsJson.scripts).map(
      ([runScriptName, command]) => ({
        name: `${yellow(runScriptName)}: ${blue(command)}`,
        value: runScriptName,
      })
    );
  } catch (error) {
    console.log(red(error));
    process.exit();
  }
};

/**
 * Prompt configuration object for the search-list.
 */
const inquirerPromptConfiguration = [
  {
    type: "search-list",
    message: pink("Search for run script"),
    name: PROMPT_NAME,
    pageSize: PROMPT_PAGE_SIZE,
    choices: createChoicesByRunScriptConfiguration(),
  },
];

/**
 * Answer handler for the answer of the user given.
 *
 * @param {*} answer { [PROMPT_NAME]: '' } object representing the command to execute.
 */
const handleAnswer = (answer) => runCommand(answer[PROMPT_NAME]);

/**
 * Error handler for the inquirer prompt.
 *
 * @param {*} error Error message.
 */
const handleError = (error) => console.log(red(error));

module.exports = {
  inquirerPromptConfiguration,
  handleAnswer,
  handleError,
};
