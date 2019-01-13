module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.(css|pcss)$': 'identity-obj-proxy',
        '\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/jest/__mocks__/fileMock.js'
    },
    rootDir: './',
    testRegex: 'tests\\.js$',
    roots: ['<rootDir>/src'],
    setupFiles: ['raf/polyfill', '<rootDir>/jest/setupTests.js'],
    coverageDirectory: '<rootDir>/jest/coverage',
    globals: {
        PROJECT_ENV: 'development'
    }
};
