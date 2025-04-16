module.exports = {
    transform: {
        '^.+\\.(ts|js|tsx)?$': 'ts-jest',
    },
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testPathIgnorePatterns: ['/node_modules/'],
    verbose: true,
    silent: false,
};
