/**
 * Super Calculator - Main Entry
 */

import { Parser } from 'expr-eval';
import BasicOperations from './operations/basic.js';
import ScientificOperations from './operations/scientific.js';
import Complex from './operations/complex.js';
import Matrix from './operations/matrix.js';
import Statistics from './operations/statistics.js';
import Financial from './operations/financial.js';
import UnitConverter from './operations/units.js';
import EquationSolver from './operations/equations.js';

const parser = new Parser();
parser.consts.pi = Math.PI;
parser.consts.e = Math.E;

export class Calculator {
  constructor() {
    this.basic = new BasicOperations();
    this.scientific = new ScientificOperations();
    this.stats = new Statistics();
    this.finance = new Financial();
    this.units = new UnitConverter();
    this.equations = new EquationSolver();
  }

  // Evaluate expression string using a safe expression parser (no eval)
  evaluate(expression, variables = {}) {
    if (typeof expression !== 'string' || expression.trim() === '') {
      throw new Error('Expression must be a non-empty string');
    }

    // Normalize unicode operators to ASCII equivalents
    const normalized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    try {
      return parser.parse(normalized).evaluate(variables);
    } catch (err) {
      const reason = err && err.message ? err.message : 'unknown error';
      throw new Error(`Invalid expression "${expression}": ${reason}`);
    }
  }
}

export default Calculator;
