const { expect, beforeEach } = require("@jest/globals");
const path = require("path");
const fs = require("fs");
const {
  readPackageJson,
  fileResolverErrorMessages,
} = require("../src/file-resolver");

/**
 * Testing contexts.
 */
const testingBasePath = path.join(__dirname, "fixtures", "packageJson");
const correctContext = path.join(testingBasePath, "correct");
const missingContext = path.join(testingBasePath, "missing");
const erronousContext = path.join(testingBasePath, "error");

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

describe("fileresolver.js tests", () => {
  it("should read a correct package.json file correctly without errors", () => {
    // given
    processCwdMock.mockReturnValue(correctContext);

    // when
    const result = readPackageJson();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should throw when package.json file is missing", () => {
    // givens
    processCwdMock.mockReturnValue(missingContext);

    // when
    // then
    expect(readPackageJson).toThrowError(
      fileResolverErrorMessages.noPackageJsonFileFound
    );
  });

  it("should throw when package.json could not be read", () => {
    // given
    const fileSystemReadFileSyncMock = jest.spyOn(fs, "readFileSync");
    processCwdMock.mockReturnValue(erronousContext);

    fileSystemReadFileSyncMock.mockImplementation(() => {
      throw new Error();
    });

    // when
    // then
    expect(readPackageJson).toThrowError(
      fileResolverErrorMessages.packageJsonFileReadError
    );
  });

  it("should throw when package.json could not be parsed", () => {
    // given
    const jsonParseMock = jest.spyOn(JSON, "parse");
    processCwdMock.mockReturnValue(erronousContext);

    jsonParseMock.mockImplementation(() => {
      throw new Error();
    });

    // when
    // then
    expect(readPackageJson).toThrowError(
      fileResolverErrorMessages.packageJsonParsingError
    );
  });

  it("should throw when package.json does not have scripts defined", () => {
    // given
    const jsonParseMock = jest.spyOn(JSON, "parse");
    processCwdMock.mockReturnValue(erronousContext);
    jsonParseMock.mockImplementation(() => ({}));

    // when
    // then
    expect(readPackageJson).toThrowError(
      fileResolverErrorMessages.packageJsonNoScriptsError
    );
  });
});
