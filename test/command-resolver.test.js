const { expect, beforeEach } = require("@jest/globals");
const path = require("path");
const fs = require("fs");
const { getRunCommand } = require("../src/command-resolver");

/**
 * Testing contexts.
 */
const testingBasePath = path.join(__dirname, "fixtures", "lock");
const correctContext = path.join(testingBasePath, "present");
const notCorrectContext = path.join(testingBasePath, "notpresent");
const correctNpmContext = path.join(correctContext, "npm");
const correctYarnContext = path.join(correctContext, "yarn");
const correctBothContext = path.join(correctContext, "both");

/**
 * Mocks.
 */
const processCwdMock = jest.spyOn(process, "cwd");

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("commandresolver.js tests", () => {
  it("should return yarn when yarn-lock file available", () => {
    // given
    processCwdMock.mockReturnValue(correctYarnContext);

    // when
    const result = getRunCommand();

    // then
    expect(result).toBe("yarn");
  });

  it("should return npm run when npm-lock file available", () => {
    // given
    processCwdMock.mockReturnValue(correctNpmContext);

    // when
    const result = getRunCommand();

    // then
    expect(result).toBe("npm run");
  });

  it("should fallback to yarn when no lock file available", () => {
    // given
    processCwdMock.mockReturnValue(notCorrectContext);

    // when
    const result = getRunCommand();

    // then
    expect(result).toBe("yarn");
  });

  it("should warn the user when no lock file available", () => {
    // given
    const consoleSpy = jest.spyOn(global.console, "warn");
    processCwdMock.mockReturnValue(notCorrectContext);

    // when
    getRunCommand();

    // then
    expect(consoleSpy).toBeCalledTimes(1);
  });

  it("should choose yarn when both lock file present", () => {
    // given
    processCwdMock.mockReturnValue(correctBothContext);

    // when
    const result = getRunCommand();

    // then
    expect(result).toBe("yarn");
  });

  it("should warn the user when both lock file types available", () => {
    // given
    const consoleSpy = jest.spyOn(global.console, "warn");
    processCwdMock.mockReturnValue(notCorrectContext);

    // when
    getRunCommand();

    // then
    expect(consoleSpy).toBeCalledTimes(1);
  });
});
