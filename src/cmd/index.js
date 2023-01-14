const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const { readFileSync, writeFileSync } = require('fs');
const { invertXml } = require('../xml-invert');
const { resolve } = require('path');

(async () => {
  try {
    const args = yargs(hideBin(process.argv));
    const [inPath, outPath] = args.argv._;
    if (!inPath || !outPath) {
      throw new Error('Invalid argumants passed.\nUsage: `npm run invert {inputPath} {outputPath}`');
    }
    if (inPath === outPath) {
      throw new Error('input path and output path must be different.');
    }
    const raw = readFileSync(inPath, 'utf-8');
    const inverted = await invertXml(raw);
    writeFileSync(outPath, inverted, 'utf-8');
    console.log(chalk.green(`=> ${resolve(outPath)}`));
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
})();
