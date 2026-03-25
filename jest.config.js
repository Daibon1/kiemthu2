module.exports = {
    testMatch: ["**/tests/**/*.js"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    testPathIgnorePatterns: ["/node_modules/", "/tests/setup.js"],
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],  // Thêm dòng này
    verbose: true
};