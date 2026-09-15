import { describe, it, expect } from 'vitest';
import Calculator from '../../src/index.js';

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

  it('should calculate standard deviation', () => {
    expect(stats.stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });
});
