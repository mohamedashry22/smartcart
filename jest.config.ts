import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  preset: "ts-jest/presets/default-esm",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
          module: "esnext",
          moduleResolution: "node",
          types: ["jest", "node"],
          esModuleInterop: true,
        },
      },
    ],
  },
};

export default config;
