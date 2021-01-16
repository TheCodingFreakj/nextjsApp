module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/tests/**",
    "!**/coverage/**",
    "!jest.config.js",
  ],
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "/.next/",
    "/node_modules/",
    "/tests/",
    "/coverage/",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "enzyme.js"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/mocks.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|my-project|react-native-button)/)",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  //setupFiles: ["<rootDir>__tests__/setup.js"],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFiles: ["<rootDir>/jest.setup.js"],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost:8000",
};

//publicRuntimeConfig undefined in testing environment
//https://github.com/vercel/next.js/issues/9761
//https://gitmemory.com/issue/zeit/next.js/9761/566505874
