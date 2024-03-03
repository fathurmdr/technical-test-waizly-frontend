const path = require("path");

const buildPrettierCommand = (filenames) =>
  filenames.map((filename) => `prettier --write '${filename}'`);

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.{js,jsx,ts,tsx}?(x)": [buildPrettierCommand],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
