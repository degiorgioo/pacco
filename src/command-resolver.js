const {
  isPackageLockAvailable,
  isYarnLockAvailable,
} = require("./file-resolver");
const { green, orange } = require("./color");

/**
 * Commands.
 */
const commands = {
  yarn: "yarn",
  npm: "npm run",
};

/**
 * Warning messages.
 */
const warnings = {
  noLockFile: green(`No lock file found. Fallback: ${orange("yarn")}`),
  bothPackageManager: green(
    `Multiple package manager usage found. Fallback: ${orange("yarn")}`
  ),
};

/**
 * Checks the package manager of the user and returns the command for the package manager.
 *
 * @returns package manager command.
 */
const getRunCommand = () => {
  const userUsesYarn = isYarnLockAvailable();
  const userUsesNpm = isPackageLockAvailable();
  const userUsesBoth = userUsesNpm && userUsesYarn;

  if (userUsesBoth) {
    console.warn(warnings.bothPackageManager);
    return commands.yarn;
  }

  if (userUsesNpm) {
    return commands.npm;
  }

  if (userUsesYarn) {
    return commands.yarn;
  }

  console.warn(warnings.noLockFile);

  return commands.yarn;
};

module.exports = {
  getRunCommand,
  commandResolverWarnings: warnings,
};
