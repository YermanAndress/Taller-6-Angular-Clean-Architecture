module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageReporters: ["html", "json", "lcov", "text", "clover"],

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],

  // @faker-js/faker v10 es ESM puro (.js con "type":"module"); hay que
  // permitir que la transformacion de jest-preset-angular lo procese.
  transformIgnorePatterns: [
    "node_modules/(?!((.*\\.mjs$)|(@angular/common/locales/.*\\.js$)|(@faker-js/faker/.*\\.js$)))",
  ],

  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/main.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },

  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  clearMocks: true,
  testMatch: ["**/*.spec.ts"],
  rootDir: './'
};
