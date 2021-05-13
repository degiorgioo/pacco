const { spawn } = require("child_process");
const { getRunCommand } = require("./command-resolver");

/**
 * Runs a package.json script.
 *
 * @param {*} script script command.
 */
const runCommand = (script) =>
  spawn(`${getRunCommand()} ${script}`, {
    stdio: "inherit",
    shell: true,
  });

module.exports = {
  runCommand,
};
