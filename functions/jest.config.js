const config = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  verbose: true,
  forceExit: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
};
