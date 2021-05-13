const fs = require("fs");
const path = require("path");

/**
 * Error messages.
 */
const errorMessages = {
  noPackageJsonFileFound: "No package.json file in the current directory.",
  packageJsonFileReadError: "package.json file could not be read.",
  packageJsonParsingError: "package.json file could not be parsed.",
  packageJsonNoScriptsError:
    "package.json file does not have any scripts defined.",
};

/**
 * File names.
 */
const fileNames = {
  packagejson: "package.json",
  yarnlock: "yarn.lock",
  packagelock: "package-lock.json",
};

/**
 * Files in the current working directory.
 *
 * @returns array of file-names.
 */
const cwdFiles = () => fs.readdirSync(process.cwd());

/**
 * Returns the path to the package.json file.
 *
 * @returns  process.cwd() package.json file-path.
 */
const packageJsonFilePath = () =>
  path.join(process.cwd(), fileNames.packagejson);

/**
 * Checks if the package.json file is in the current working directory.
 *
 * @returns boolean if package.json file available.
 */
const isPackageJsonAvailable = () => cwdFiles().includes(fileNames.packagejson);

/**
 * Checks if the yarn.lock file is in the current working directory.
 *
 * @returns boolean if yarn.lock file available.
 */
const isYarnLockAvailable = () => cwdFiles().includes(fileNames.yarnlock);

/**
 * Checks if the package-lock.json file is in the current working directory.
 *
 * @returns boolean if package-lock.json file available.
 */
const isPackageLockAvailable = () => cwdFiles().includes(fileNames.packagelock);

/**
 * Checks if the package.json file is available, reads and parses it to a json.
 */
const readPackageJson = () => {
  let packageJsonAsJson = {};
  let packageJsonFileBuffer;

  if (!isPackageJsonAvailable()) {
    throw new Error(errorMessages.noPackageJsonFileFound);
  }

  try {
    packageJsonFileBuffer = fs.readFileSync(packageJsonFilePath());
  } catch (error) {
    throw new Error(errorMessages.packageJsonFileReadError);
  }

  try {
    packageJsonAsJson = JSON.parse(packageJsonFileBuffer);
  } catch (error) {
    throw new Error(errorMessages.packageJsonParsingError);
  }

  if (!packageJsonAsJson.scripts) {
    throw new Error(errorMessages.packageJsonNoScriptsError);
  }

  return packageJsonAsJson;
};

module.exports = {
  isYarnLockAvailable,
  isPackageLockAvailable,
  readPackageJson,
  fileResolverErrorMessages: errorMessages,
};
