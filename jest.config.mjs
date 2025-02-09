export default {
    setupFiles: [],
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testEnvironment: 'node',
    testTimeout: 10000,
    forceExit: true,
    detectOpenHandles: false
}; 