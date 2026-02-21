#!/usr/bin/env node

import chalk from 'chalk';
import Calculator from './index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const calc = new Calculator();

async function main() {
  // Show help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  // Show version
  if (args.includes('--version') || args.includes('-v')) {
    const pkg = JSON.parse(fs.readFileSync(join(__dirname, '../package.json'), 'utf-8'));
    console.log(`super-calculator v${pkg.version}`);
    return;
  }

  // Statistics mode
  if (args.includes('--stats')) {
    const values = args.filter(a => !a.startsWith('--')).map(Number).filter(n => !isNaN(n));
    if (values.length === 0) {
      console.error(chalk.red('Please provide numbers for statistics'));
      process.exit(1);
    }
    const result = calc.stats.summary(values);
    console.log(chalk.cyan('Statistics Summary:'));
    console.table(result);
    return;
  }

  // Equation solving
  const solveIdx = args.indexOf('--solve');
  if (solveIdx !== -1 && args[solveIdx + 1]) {
    const result = calc.equations.solveExpression(args[solveIdx + 1]);
    console.log(chalk.cyan('Solution:'));
    console.log(result);
    return;
  }

  // Unit conversion
  const convertIdx = args.indexOf('--convert');
  if (convertIdx !== -1) {
    const value = parseFloat(args[convertIdx + 1]);
    const from = args[convertIdx + 2];
    const to = args[convertIdx + 3];
    console.log(`${value} ${from} = ${to} (conversion)`);
    return;
  }

  // Basic calculation
  if (args.length === 0) {
    showHelp();
    return;
  }

  const expression = args.join(' ');
  try {
    const result = calc.evaluate(expression);
    console.log(chalk.green(`${expression} = ${result}`));
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
${chalk.cyan('Super Calculator')} - Solve Complex Problems

${chalk.yellow('Usage:')}
  calc <expression>
  calc --stats <numbers...>
  calc --solve "2x + 5 = 15"
  calc --convert <value> <from> <to>

${chalk.yellow('Examples:')}
  calc 2 + 2
  calc "sqrt(16) + sin(45)"
  calc --stats 1 2 3 4 5
  calc --solve "2x + 5 = 15"

${chalk.yellow('Operators:')}
  + - * / ^ ( )
  sqrt() sin() cos() tan()
  log() log10() exp() abs()
  pi e
  `);
}

main();
