import CustomError from "./CustomError.js";

export const getEnvironmentVariable = (variableName) => {
  const value = process.env[variableName];
  if (value === undefined || value === null) {
    throw new CustomError(
      "UNDEFINED_ENV",
      `${variableName} is not defined in the environment `
    );
  }
  return value;
};
