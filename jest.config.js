module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testEnvironment": "jsdom",

  // Setup Enzyme
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/setupEnzyme.ts"],
  "moduleNameMapper": {
    ".+\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    ".+\\.(svg|png)$": "<rootDir>/__mocks__/imgMock.ts"
  },
};
