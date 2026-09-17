import { describe, it, expect } from 'vitest';
import Calculator, { Complex, Matrix } from '../../src/index.js';

describe('Calculator', () => {
  const calc = new Calculator();

  it('should add numbers', () => {
    expect(calc.evaluate('2 + 3')).toBe(5);
  });

  it('should multiply numbers', () => {
    expect(calc.evaluate('4 * 5')).toBe(20);
  });

  it('should handle parentheses', () => {
    expect(calc.evaluate('(2 + 3) * 4')).toBe(20);
  });

  it('should calculate powers', () => {
    expect(calc.evaluate('2 ^ 3')).toBe(8);
  });

  it('should use pi', () => {
    expect(calc.evaluate('pi')).toBeCloseTo(Math.PI);
  });

  it('should use e', () => {
    expect(calc.evaluate('e')).toBeCloseTo(Math.E);
  });

  it('should calculate modulo', () => {
    expect(calc.evaluate('10 % 4')).toBe(2);
  });

  it('should evaluate trigonometry functions', () => {
    expect(calc.evaluate('sin(0)')).toBeCloseTo(0);
    expect(calc.evaluate('cos(0)')).toBeCloseTo(1);
    expect(calc.evaluate('tan(0)')).toBeCloseTo(0);
    expect(calc.evaluate('sin(pi / 2)')).toBeCloseTo(1);
  });

  it('should evaluate log, ln, exp, sqrt and abs', () => {
    expect(calc.evaluate('log(e)')).toBeCloseTo(1);
    expect(calc.evaluate('ln(e)')).toBeCloseTo(1);
    expect(calc.evaluate('exp(1)')).toBeCloseTo(Math.E);
    expect(calc.evaluate('sqrt(4)')).toBeCloseTo(2);
    expect(calc.evaluate('abs(-5)')).toBeCloseTo(5);
    expect(calc.evaluate('sqrt(2) ^ 2')).toBeCloseTo(2);
  });

  it('should honor operator precedence', () => {
    expect(calc.evaluate('2 + 3 * 4')).toBe(14);
    expect(calc.evaluate('(2 + 3) * 4')).toBe(20);
    expect(calc.evaluate('2 ^ 3 * 2')).toBe(16);
  });

  it('should normalize unicode operators', () => {
    expect(calc.evaluate('4 × 5')).toBe(20);
    expect(calc.evaluate('10 ÷ 2')).toBe(5);
  });

  it('should reject malformed expressions with a clear error', () => {
    expect(() => calc.evaluate('')).toThrow('Expression must be a non-empty string');
    expect(() => calc.evaluate('2 +')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('(2 + 3')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('2 + 3)')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('foo(2)')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('2..3')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('<script>alert(1)</script>')).toThrow(/Invalid expression/);
  });

  it('should reject code injection attempts', () => {
    expect(() => calc.evaluate("Math.constructor('return this')()")).toThrow(/Invalid expression/);
    expect(() => calc.evaluate("Math.constructor('return process')().exit()")).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('process.exit()')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate("this.constructor.constructor('return this')()")).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('require("child_process")')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('Function("return this")()')).toThrow(/Invalid expression/);
  });

  it('should reject object member access', () => {
    expect(() => calc.evaluate('Math.random')).toThrow(/Invalid expression/);
    expect(() => calc.evaluate('Math[' + 'this]')).toThrow(/Invalid expression/);
  });
});

describe('Calculator flat API', () => {
  const calc = new Calculator();

  it('delegates basic operations', () => {
    expect(calc.add(10, 5)).toBe(15);
    expect(calc.subtract(10, 5)).toBe(5);
    expect(calc.multiply(10, 5)).toBe(50);
    expect(calc.divide(10, 5)).toBe(2);
    expect(calc.power(2, 3)).toBe(8);
    expect(calc.factorial(5)).toBe(120);
  });

  it('delegates scientific operations', () => {
    expect(calc.sin(30)).toBeCloseTo(0.5);
    expect(calc.cos(60)).toBeCloseTo(0.5);
    expect(calc.sqrt(144)).toBe(12);
  });

  it('delegates statistics operations', () => {
    expect(calc.mean([1, 2, 3, 4, 5])).toBe(3);
    expect(calc.median([1, 2, 3, 4, 5])).toBe(3);
    expect(calc.max([1, 2, 3])).toBe(3);
  });

  it('delegates financial operations', () => {
    expect(calc.simpleInterest(1000, 5, 10)).toBe(1500);
  });

  it('delegates unit conversions', () => {
    expect(calc.kmToMiles(1)).toBeCloseTo(0.621371);
  });

  it('delegates equation solving', () => {
    expect(calc.solveExpression('2x + 5 = 15').solutions[0]).toBe(5);
  });

  it('complex() returns a Complex instance', () => {
    const z = calc.complex(3, 4);
    expect(z).toBeInstanceOf(Complex);
    expect(z.re).toBe(3);
    expect(z.im).toBe(4);
    expect(z.magnitude()).toBe(5);
  });

  it('matrix() returns a Matrix instance', () => {
    const m = calc.matrix([[1, 2], [3, 4]]);
    expect(m).toBeInstanceOf(Matrix);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(2);
    expect(m.determinant()).toBe(-2);
  });

  it('still exposes sub-modules', () => {
    expect(calc.basic.add(10, 5)).toBe(15);
    expect(calc.scientific.sin(30)).toBeCloseTo(0.5);
    expect(calc.stats.mean([1, 2, 3, 4, 5])).toBe(3);
  });

  it('exports Complex and Matrix as named exports', () => {
    expect(new Complex(1, 2)).toBeInstanceOf(Complex);
    expect(new Matrix([[1]])).toBeInstanceOf(Matrix);
  });
});

describe('BasicOperations', () => {
  const { basic } = new Calculator();

  it('should calculate factorial', () => {
    expect(basic.factorial(5)).toBe(120);
  });

  it('should calculate GCD', () => {
    expect(basic.gcd(48, 18)).toBe(6);
  });

  it('should calculate LCM', () => {
    expect(basic.lcm(4, 6)).toBe(12);
  });
});

describe('Statistics', () => {
  const { stats } = new Calculator();

  it('should calculate mean', () => {
    expect(stats.mean([1, 2, 3, 4, 5])).toBe(3);
  });

  it('should calculate median', () => {
    expect(stats.median([1, 2, 3, 4, 5])).toBe(3);
  });

  it('should calculate population standard deviation', () => {
    expect(stats.stdDev([2, 4, 4, 4, 5, 5, 7, 9], false)).toBe(2);
  });

  it('should calculate sample standard deviation by default', () => {
    expect(stats.stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138);
  });
});

describe('Statistics Validation', () => {
  const { stats } = new Calculator();

  it('mean throws on empty array', () => {
    expect(() => stats.mean([])).toThrow('Cannot compute mean of empty array');
  });

  it('median throws on empty array', () => {
    expect(() => stats.median([])).toThrow('Cannot compute median of empty array');
  });

  it('mode throws on empty array', () => {
    expect(() => stats.mode([])).toThrow('Cannot compute mode of empty array');
  });

  it('variance throws on empty array', () => {
    expect(() => stats.variance([])).toThrow('Cannot compute variance of empty array');
  });

  it('stdDev throws on empty array', () => {
    expect(() => stats.stdDev([])).toThrow('Cannot compute variance of empty array');
  });

  it('min throws on empty array', () => {
    expect(() => stats.min([])).toThrow('Cannot compute min of empty array');
  });

  it('max throws on empty array', () => {
    expect(() => stats.max([])).toThrow('Cannot compute max of empty array');
  });

  it('min/max handle large arrays without overflow', () => {
    const big = Array.from({ length: 100000 }, (_, i) => i + 1);
    expect(stats.min(big)).toBe(1);
    expect(stats.max(big)).toBe(100000);
  });

  it('variance defaults to sample variance (n-1)', () => {
    const values = [1, 2, 3, 4, 5];
    const popVar = stats.variance(values, false);
    const sampleVar = stats.variance(values, true);
    expect(sampleVar).toBeCloseTo(2.5);
    expect(popVar).toBeCloseTo(2.0);
  });

  it('sample variance throws with single value', () => {
    expect(() => stats.variance([5], true)).toThrow('Cannot compute sample variance with a single value');
  });

  it('population variance works with single value', () => {
    expect(stats.variance([5], false)).toBe(0);
  });
});

describe('Matrix Validation', () => {
  it('throws on jagged arrays', () => {
    expect(() => new Matrix([[1, 2], [3]])).toThrow(/row 1 has length 1, expected 2/);
  });

  it('throws on non-array rows', () => {
    expect(() => new Matrix([1, 2, 3])).toThrow(/row 0 is not an array/);
  });

  it('accepts valid uniform matrices', () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
  });

  it('throws on empty matrix', () => {
    expect(() => new Matrix([])).toThrow('Invalid matrix data');
  });
});

describe('Financial Validation', () => {
  const { finance } = new Calculator();

  it('simpleInterest rejects negative principal', () => {
    expect(() => finance.simpleInterest(-1000, 5, 10)).toThrow('Principal must be non-negative');
  });

  it('simpleInterest rejects zero rate', () => {
    expect(() => finance.simpleInterest(1000, 0, 10)).toThrow('Rate must be positive');
  });

  it('compoundInterest rejects negative principal', () => {
    expect(() => finance.compoundInterest(-1000, 5, 10)).toThrow('Principal must be non-negative');
  });

  it('compoundInterest rejects negative time', () => {
    expect(() => finance.compoundInterest(1000, 5, -1)).toThrow('Time must be non-negative');
  });

  it('emi rejects negative principal', () => {
    expect(() => finance.emi(-100000, 6, 30)).toThrow('Principal must be positive');
  });

  it('emi rejects zero term', () => {
    expect(() => finance.emi(100000, 6, 0)).toThrow('Loan term must be positive');
  });

  it('futureValue rejects negative principal', () => {
    expect(() => finance.futureValue(-1000, 5, 10)).toThrow('Principal must be non-negative');
  });

  it('presentValue rejects negative future value', () => {
    expect(() => finance.presentValue(-1000, 5, 10)).toThrow('Future value must be non-negative');
  });

  it('cagr rejects zero initial value', () => {
    expect(() => finance.cagr(0, 1000, 5)).toThrow('Initial value must be positive');
  });

  it('cagr rejects zero years', () => {
    expect(() => finance.cagr(1000, 2000, 0)).toThrow('Years must be positive');
  });

  it('npv rejects zero rate', () => {
    expect(() => finance.npv(0, [100, 200])).toThrow('Rate must be positive');
  });

  it('npv rejects empty cash flows', () => {
    expect(() => finance.npv(5, [])).toThrow('Cash flows must be a non-empty array');
  });

  it('valid inputs still produce correct results', () => {
    expect(finance.simpleInterest(1000, 5, 10)).toBe(1500);
    expect(finance.compoundInterest(1000, 5, 1)).toBeCloseTo(1051.16);
  });
});

describe('EquationSolver Validation', () => {
  const { equations } = new Calculator();

  it('solves linear equation', () => {
    const result = equations.solveExpression('2x + 5 = 15');
    expect(result.solutions[0]).toBe(5);
  });

  it('solves quadratic equation x^2 - 4 = 0', () => {
    const result = equations.solveExpression('x^2 - 4 = 0');
    expect(result.type).toBe('quadratic');
    expect(result.solutions).toHaveLength(2);
    expect(result.solutions).toContain(2);
    expect(result.solutions).toContain(-2);
  });

  it('solves quadratic equation x^2 - 5x + 6 = 0', () => {
    const result = equations.solveExpression('x^2 - 5x + 6 = 0');
    expect(result.type).toBe('quadratic');
    expect(result.solutions).toContain(2);
    expect(result.solutions).toContain(3);
  });

  it('throws on invalid equation format', () => {
    expect(() => equations.solveExpression('2x + 5')).toThrow('Invalid equation format');
  });

  it('handles complex roots gracefully', () => {
    const result = equations.solveExpression('x^2 + 1 = 0');
    expect(result.type).toBe('quadratic');
    expect(result.discriminant).toBe('negative');
  });
});
