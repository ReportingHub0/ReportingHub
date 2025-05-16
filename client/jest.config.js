module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',     // لحل مشكلة CSS
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // للصور إن لزم
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // للسماح بتحويل axios لأنه يستخدم ESM
    ],
  };
  