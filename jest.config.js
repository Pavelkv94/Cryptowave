
module.exports =  {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/fileMock.ts',
        '\\.(css|scss)$': '<rootDir>/src/test/stylesMock.ts', // Path to mock CSS files

    },
}