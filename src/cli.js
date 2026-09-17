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
    const values = args
      .filter(a => !a.startsWith('--'))
      .flatMap(a => String(a).split(/[,\s]+/))
      .filter(Boolean)
      .map(Number)
      .filter(n => !isNaN(n));
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
    try {
      const { value, from, to } = parseConvertArgs(args.slice(convertIdx + 1));
      const result = calc.units.convert(value, from, to);
      console.log(`${value} ${from} = ${formatNumber(result)} ${to}`);
    } catch (err) {
      console.error(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }
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

function parseConvertArgs(tokens) {
  const parts = tokens.flatMap(t => String(t).split(/\s+/)).filter(Boolean).filter(t => t !== 'to');
  const value = parseFloat(parts[0]);
  const from = parts[1];
  const to = parts[2];
  if (!Number.isFinite(value) || !from || !to) {
    throw new Error(
      'Usage: calc --convert <value> <from> <to>, e.g. calc --convert 100 km to miles'
    );
  }
  return { value, from, to };
}

function formatNumber(n) {
  return String(Number(n.toFixed(4)));
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
  calc --convert 100 km to miles
  calc --convert "100 km to miles"
  calc --convert 32 f to c
  calc --convert 1 gb to mb

${chalk.yellow('Operators:')}
  + - * / ^ ( )
  sqrt() sin() cos() tan()
  log() log10() exp() abs()
  pi e
  `);
}

main();
