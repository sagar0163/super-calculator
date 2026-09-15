import { describe, it, expect } from 'vitest';
import BasicOperations from '../../src/operations/basic.js';

describe('BasicOperations', () => {
  const basic = new BasicOperations();

  it('should handle addition', () => {
    expect(basic.add(2, 3)).toBe(5);
    expect(basic.add(-5, 5)).toBe(0);
    expect(basic.add(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
  });

  it('should handle subtraction', () => {
    expect(basic.subtract(5, 3)).toBe(2);
    expect(basic.subtract(3, 5)).toBe(-2);
    expect(basic.subtract(0, 5)).toBe(-5);
  });

  it('should handle multiplication', () => {
    expect(basic.multiply(5, 3)).toBe(15);
    expect(basic.multiply(-5, 3)).toBe(-15);
    expect(basic.multiply(0, 5)).toBe(0);
    expect(basic.multiply(Number.MAX_VALUE, 2)).toBe(Infinity);
  });

  it('should handle division', () => {
    expect(basic.divide(6, 3)).toBe(2);
    expect(basic.divide(-6, 3)).toBe(-2);
    expect(() => basic.divide(5, 0)).toThrow('Division by zero');
  });

  it('should handle modulo', () => {
    expect(basic.modulo(5, 3)).toBe(2);
    expect(basic.modulo(6, 3)).toBe(0);
    expect(() => basic.modulo(5, 0)).toThrow('Modulo by zero');
  });

  it('should handle power', () => {
    expect(basic.power(2, 3)).toBe(8);
    expect(basic.power(2, 0)).toBe(1);
    expect(basic.power(2, -1)).toBe(0.5);
  });

  it('should handle square root', () => {
    expect(basic.sqrt(9)).toBe(3);
    expect(basic.sqrt(0)).toBe(0);
    expect(() => basic.sqrt(-1)).toThrow('Cannot take square root of negative number');
  });

  it('should calculate factorial', () => {
    expect(basic.factorial(5)).toBe(120);
    expect(basic.factorial(0)).toBe(1);
    expect(basic.factorial(1)).toBe(1);
    expect(() => basic.factorial(-1)).toThrow('Factorial of negative number');
  });

  it('should calculate GCD', () => {
    expect(basic.gcd(48, 18)).toBe(6);
    expect(basic.gcd(-48, 18)).toBe(6);
    expect(basic.gcd(0, 5)).toBe(5);
  });

  it('should calculate LCM', () => {
    expect(basic.lcm(4, 6)).toBe(12);
    expect(basic.lcm(-4, 6)).toBe(12);
    expect(basic.lcm(0, 5)).toBe(0);
  });
});
