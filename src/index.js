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

  // --- instances ---
  complex(re, im) { return new Complex(re, im); }
  matrix(data) { return new Matrix(data); }

  // --- basic ---
  add(...args) { return this.basic.add(...args); }
  subtract(...args) { return this.basic.subtract(...args); }
  multiply(...args) { return this.basic.multiply(...args); }
  divide(...args) { return this.basic.divide(...args); }
  modulo(...args) { return this.basic.modulo(...args); }
  power(...args) { return this.basic.power(...args); }
  sqrt(...args) { return this.basic.sqrt(...args); }
  factorial(...args) { return this.basic.factorial(...args); }
  gcd(...args) { return this.basic.gcd(...args); }
  lcm(...args) { return this.basic.lcm(...args); }

  // --- scientific ---
  sin(...args) { return this.scientific.sin(...args); }
  cos(...args) { return this.scientific.cos(...args); }
  tan(...args) { return this.scientific.tan(...args); }
  asin(...args) { return this.scientific.asin(...args); }
  acos(...args) { return this.scientific.acos(...args); }
  atan(...args) { return this.scientific.atan(...args); }
  sinh(...args) { return this.scientific.sinh(...args); }
  cosh(...args) { return this.scientific.cosh(...args); }
  tanh(...args) { return this.scientific.tanh(...args); }
  log(...args) { return this.scientific.log(...args); }
  log10(...args) { return this.scientific.log10(...args); }
  log2(...args) { return this.scientific.log2(...args); }
  exp(...args) { return this.scientific.exp(...args); }
  abs(...args) { return this.scientific.abs(...args); }
  floor(...args) { return this.scientific.floor(...args); }
  ceil(...args) { return this.scientific.ceil(...args); }
  round(...args) { return this.scientific.round(...args); }
  toRadians(...args) { return this.scientific.toRadians(...args); }
  toDegrees(...args) { return this.scientific.toDegrees(...args); }
  roundTo(...args) { return this.scientific.roundTo(...args); }

  // --- statistics ---
  mean(...args) { return this.stats.mean(...args); }
  median(...args) { return this.stats.median(...args); }
  mode(...args) { return this.stats.mode(...args); }
  variance(...args) { return this.stats.variance(...args); }
  stdDev(...args) { return this.stats.stdDev(...args); }
  min(...args) { return this.stats.min(...args); }
  max(...args) { return this.stats.max(...args); }
  range(...args) { return this.stats.range(...args); }
  percentile(...args) { return this.stats.percentile(...args); }
  quartiles(...args) { return this.stats.quartiles(...args); }
  correlation(...args) { return this.stats.correlation(...args); }
  summary(...args) { return this.stats.summary(...args); }

  // --- financial ---
  simpleInterest(...args) { return this.finance.simpleInterest(...args); }
  compoundInterest(...args) { return this.finance.compoundInterest(...args); }
  emi(...args) { return this.finance.emi(...args); }
  futureValue(...args) { return this.finance.futureValue(...args); }
  presentValue(...args) { return this.finance.presentValue(...args); }
  roi(...args) { return this.finance.roi(...args); }
  cagr(...args) { return this.finance.cagr(...args); }
  npv(...args) { return this.finance.npv(...args); }
  profitMargin(...args) { return this.finance.profitMargin(...args); }
  breakEven(...args) { return this.finance.breakEven(...args); }

  // --- units ---
  kmToMiles(...args) { return this.units.kmToMiles(...args); }
  milesToKm(...args) { return this.units.milesToKm(...args); }
  metersToFeet(...args) { return this.units.metersToFeet(...args); }
  feetToMeters(...args) { return this.units.feetToMeters(...args); }
  cmToInches(...args) { return this.units.cmToInches(...args); }
  inchesToCm(...args) { return this.units.inchesToCm(...args); }
  kgToPounds(...args) { return this.units.kgToPounds(...args); }
  poundsToKg(...args) { return this.units.poundsToKg(...args); }
  gramsToOunces(...args) { return this.units.gramsToOunces(...args); }
  ouncesToGrams(...args) { return this.units.ouncesToGrams(...args); }
  celsiusToFahrenheit(...args) { return this.units.celsiusToFahrenheit(...args); }
  fahrenheitToCelsius(...args) { return this.units.fahrenheitToCelsius(...args); }
  celsiusToKelvin(...args) { return this.units.celsiusToKelvin(...args); }
  kelvinToCelsius(...args) { return this.units.kelvinToCelsius(...args); }
  litersToGallons(...args) { return this.units.litersToGallons(...args); }
  gallonsToLiters(...args) { return this.units.gallonsToLiters(...args); }
  mlToFlOz(...args) { return this.units.mlToFlOz(...args); }
  bytesToKB(...args) { return this.units.bytesToKB(...args); }
  bytesToMB(...args) { return this.units.bytesToMB(...args); }
  bytesToGB(...args) { return this.units.bytesToGB(...args); }
  hoursToMinutes(...args) { return this.units.hoursToMinutes(...args); }
  minutesToSeconds(...args) { return this.units.minutesToSeconds(...args); }
  daysToHours(...args) { return this.units.daysToHours(...args); }
  sqmToSqft(...args) { return this.units.sqmToSqft(...args); }
  sqftToSqm(...args) { return this.units.sqftToSqm(...args); }
  acresToHectares(...args) { return this.units.acresToHectares(...args); }
  hectaresToAcres(...args) { return this.units.hectaresToAcres(...args); }
  kmhToMph(...args) { return this.units.kmhToMph(...args); }
  mphToKmh(...args) { return this.units.mphToKmh(...args); }
  msToKmh(...args) { return this.units.msToKmh(...args); }

  // --- equations ---
  solveLinear(...args) { return this.equations.solveLinear(...args); }
  solveQuadratic(...args) { return this.equations.solveQuadratic(...args); }
  solveExpression(...args) { return this.equations.solveExpression(...args); }
  solveSystem(...args) { return this.equations.solveSystem(...args); }
}

export { Complex, Matrix };
export default Calculator;
