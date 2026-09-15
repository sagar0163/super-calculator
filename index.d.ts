/**
 * Type definitions for super-calculator
 */

export class Complex {
  constructor(re: number, im?: number);
  re: number;
  im: number;
  add(other: Complex): Complex;
  subtract(other: Complex): Complex;
  multiply(other: Complex): Complex;
  divide(other: Complex): Complex;
  magnitude(): number;
  argument(): number;
  conjugate(): Complex;
  sqrt(): Complex;
  exp(): Complex;
  log(): Complex;
  toString(): string;
}

export class Matrix {
  constructor(data: number[][]);
  data: number[][];
  rows: number;
  cols: number;
  static identity(size: number): Matrix;
  static zeros(rows: number, cols: number): Matrix;
  add(other: Matrix): Matrix;
  multiply(other: Matrix): Matrix;
  scalarMultiply(scalar: number): Matrix;
  transpose(): Matrix;
  determinant(): number;
  inverse(): Matrix;
  toString(): string;
}

export class BasicOperations {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  modulo(a: number, b: number): number;
  power(base: number, exponent: number): number;
  sqrt(value: number): number;
  factorial(n: number): number;
  gcd(a: number, b: number): number;
  lcm(a: number, b: number): number;
}

export class ScientificOperations {
  sin(degrees: number): number;
  cos(degrees: number): number;
  tan(degrees: number): number;
  asin(value: number): number;
  acos(value: number): number;
  atan(value: number): number;
  sinh(x: number): number;
  cosh(x: number): number;
  tanh(x: number): number;
  log(value: number, base?: number): number;
  log10(value: number): number;
  log2(value: number): number;
  exp(x: number): number;
  abs(value: number): number;
  floor(value: number): number;
  ceil(value: number): number;
  round(value: number): number;
  toRadians(degrees: number): number;
  toDegrees(radians: number): number;
  roundTo(value: number, decimals: number): number;
}

export interface Quartiles {
  q1: number;
  q2: number;
  q3: number;
}

export interface SummaryResult extends Quartiles {
  count: number;
  mean: number;
  median: number;
  mode: number[] | null;
  stdDev: number;
  min: number;
  max: number;
  range: number;
}

export class Statistics {
  mean(values: number[]): number;
  median(values: number[]): number;
  mode(values: number[]): number[] | null;
  variance(values: number[], sample?: boolean): number;
  stdDev(values: number[], sample?: boolean): number;
  min(values: number[]): number;
  max(values: number[]): number;
  range(values: number[]): number;
  percentile(values: number[], p: number): number;
  quartiles(values: number[]): Quartiles;
  correlation(x: number[], y: number[]): number;
  summary(values: number[]): SummaryResult;
}

export class Financial {
  simpleInterest(principal: number, rate: number, time: number): number;
  compoundInterest(
    principal: number,
    rate: number,
    time: number,
    frequency?: number
  ): number;
  emi(principal: number, annualRate: number, years: number): number;
  futureValue(
    principal: number,
    rate: number,
    time: number,
    compoundingFrequency?: number
  ): number;
  presentValue(
    futureValue: number,
    rate: number,
    time: number,
    compoundingFrequency?: number
  ): number;
  roi(initialInvestment: number, finalValue: number): number;
  cagr(initialValue: number, finalValue: number, years: number): number;
  npv(rate: number, cashFlows: number[]): number;
  profitMargin(revenue: number, cost: number): number;
  breakEven(
    fixedCosts: number,
    pricePerUnit: number,
    variableCostPerUnit: number
  ): number;
}

export class UnitConverter {
  kmToMiles(km: number): number;
  milesToKm(miles: number): number;
  metersToFeet(m: number): number;
  feetToMeters(ft: number): number;
  cmToInches(cm: number): number;
  inchesToCm(inches: number): number;
  kgToPounds(kg: number): number;
  poundsToKg(lbs: number): number;
  gramsToOunces(g: number): number;
  ouncesToGrams(oz: number): number;
  celsiusToFahrenheit(c: number): number;
  fahrenheitToCelsius(f: number): number;
  celsiusToKelvin(c: number): number;
  kelvinToCelsius(k: number): number;
  litersToGallons(l: number): number;
  gallonsToLiters(gal: number): number;
  mlToFlOz(ml: number): number;
  bytesToKB(bytes: number): number;
  bytesToMB(bytes: number): number;
  bytesToGB(bytes: number): number;
  hoursToMinutes(h: number): number;
  minutesToSeconds(m: number): number;
  daysToHours(d: number): number;
  sqmToSqft(sqm: number): number;
  sqftToSqm(sqft: number): number;
  acresToHectares(acres: number): number;
  hectaresToAcres(ha: number): number;
  kmhToMph(kmh: number): number;
  mphToKmh(mph: number): number;
  msToKmh(ms: number): number;
}

export type LinearSolution =
  | { type: 'linear'; solutions: [number]; x: number }
  | { type: 'infinite'; solutions: [] }
  | { type: 'none'; solutions: [] };

export type QuadraticSolution =
  | {
      type: 'quadratic';
      discriminant: 'positive';
      solutions: [number, number];
      x1: number;
      x2: number;
    }
  | { type: 'quadratic'; discriminant: 'zero'; solutions: [number]; x: number }
  | {
      type: 'quadratic';
      discriminant: 'negative';
      solutions: [];
      realPart: number;
      imagPart: number;
      complex: [string, string];
    };

export type EquationSolution = LinearSolution | QuadraticSolution;

export type SystemSolution =
  | { type: 'unique'; solutions: { x: number; y: number }; x: number; y: number }
  | { type: 'no-solution' };

export class EquationSolver {
  solveLinear(a: number, b: number): LinearSolution;
  solveQuadratic(a: number, b: number, c: number): EquationSolution;
  solveExpression(equation: string): EquationSolution;
  solveSystem(
    a1: number,
    b1: number,
    c1: number,
    a2: number,
    b2: number,
    c2: number
  ): SystemSolution;
}

export declare class Calculator {
  basic: BasicOperations;
  scientific: ScientificOperations;
  stats: Statistics;
  finance: Financial;
  units: UnitConverter;
  equations: EquationSolver;

  constructor();
  evaluate(expression: string, variables?: Record<string, number>): number;

  complex(re: number, im?: number): Complex;
  matrix(data: number[][]): Matrix;

  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  modulo(a: number, b: number): number;
  power(base: number, exponent: number): number;
  sqrt(value: number): number;
  factorial(n: number): number;
  gcd(a: number, b: number): number;
  lcm(a: number, b: number): number;

  sin(degrees: number): number;
  cos(degrees: number): number;
  tan(degrees: number): number;
  asin(value: number): number;
  acos(value: number): number;
  atan(value: number): number;
  sinh(x: number): number;
  cosh(x: number): number;
  tanh(x: number): number;
  log(value: number, base?: number): number;
  log10(value: number): number;
  log2(value: number): number;
  exp(x: number): number;
  abs(value: number): number;
  floor(value: number): number;
  ceil(value: number): number;
  round(value: number): number;
  toRadians(degrees: number): number;
  toDegrees(radians: number): number;
  roundTo(value: number, decimals: number): number;

  mean(values: number[]): number;
  median(values: number[]): number;
  mode(values: number[]): number[] | null;
  variance(values: number[], sample?: boolean): number;
  stdDev(values: number[], sample?: boolean): number;
  min(values: number[]): number;
  max(values: number[]): number;
  range(values: number[]): number;
  percentile(values: number[], p: number): number;
  quartiles(values: number[]): Quartiles;
  correlation(x: number[], y: number[]): number;
  summary(values: number[]): SummaryResult;

  simpleInterest(principal: number, rate: number, time: number): number;
  compoundInterest(
    principal: number,
    rate: number,
    time: number,
    frequency?: number
  ): number;
  emi(principal: number, annualRate: number, years: number): number;
  futureValue(
    principal: number,
    rate: number,
    time: number,
    compoundingFrequency?: number
  ): number;
  presentValue(
    futureValue: number,
    rate: number,
    time: number,
    compoundingFrequency?: number
  ): number;
  roi(initialInvestment: number, finalValue: number): number;
  cagr(initialValue: number, finalValue: number, years: number): number;
  npv(rate: number, cashFlows: number[]): number;
  profitMargin(revenue: number, cost: number): number;
  breakEven(
    fixedCosts: number,
    pricePerUnit: number,
    variableCostPerUnit: number
  ): number;

  kmToMiles(km: number): number;
  milesToKm(miles: number): number;
  metersToFeet(m: number): number;
  feetToMeters(ft: number): number;
  cmToInches(cm: number): number;
  inchesToCm(inches: number): number;
  kgToPounds(kg: number): number;
  poundsToKg(lbs: number): number;
  gramsToOunces(g: number): number;
  ouncesToGrams(oz: number): number;
  celsiusToFahrenheit(c: number): number;
  fahrenheitToCelsius(f: number): number;
  celsiusToKelvin(c: number): number;
  kelvinToCelsius(k: number): number;
  litersToGallons(l: number): number;
  gallonsToLiters(gal: number): number;
  mlToFlOz(ml: number): number;
  bytesToKB(bytes: number): number;
  bytesToMB(bytes: number): number;
  bytesToGB(bytes: number): number;
  hoursToMinutes(h: number): number;
  minutesToSeconds(m: number): number;
  daysToHours(d: number): number;
  sqmToSqft(sqm: number): number;
  sqftToSqm(sqft: number): number;
  acresToHectares(acres: number): number;
  hectaresToAcres(ha: number): number;
  kmhToMph(kmh: number): number;
  mphToKmh(mph: number): number;
  msToKmh(ms: number): number;

  solveLinear(a: number, b: number): LinearSolution;
  solveQuadratic(a: number, b: number, c: number): EquationSolution;
  solveExpression(equation: string): EquationSolution;
  solveSystem(
    a1: number,
    b1: number,
    c1: number,
    a2: number,
    b2: number,
    c2: number
  ): SystemSolution;
}

export default Calculator;