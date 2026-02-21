/**
 * Super Calculator - Main Entry
 */

import BasicOperations from './operations/basic.js';
import ScientificOperations from './operations/scientific.js';
import Complex from './operations/complex.js';
import Matrix from './operations/matrix.js';
import Statistics from './operations/statistics.js';
import Financial from './operations/financial.js';
import UnitConverter from './operations/units.js';
import EquationSolver from './operations/equations.js';

export class Calculator {
  constructor() {
    this.basic = new BasicOperations();
    this.scientific = new ScientificOperations();
    this.stats = new Statistics();
    this.finance = new Financial();
    this.units = new UnitConverter();
    this.equations = new EquationSolver();
  }

  // Evaluate expression string
  evaluate(expression) {
    // Safe evaluation of basic math expressions
    const safeEval = (expr) => {
      // Replace operators with JavaScript equivalents
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log(')
        .replace(/log10\(/g, 'Math.log10(')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/pi/gi, 'Math.PI')
        .replace(/e(?![x])/g, 'Math.E');
      
      // Only allow numbers, operators, and Math functions
      if (!/^[\d\s+\-*/().Math,]+$/.test(sanitized)) {
        throw new Error('Invalid characters in expression');
      }
      
      return Function('"use strict"; return (' + sanitized + ')')();
    };
    
    return safeEval(expression);
  }
}

export default Calculator;
