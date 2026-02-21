import { describe, it, expect } from 'vitest';
import Calculator from '../src/index.js';

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
