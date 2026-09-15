import { describe, it, expect } from 'vitest';
import Complex from '../../src/operations/complex.js';

describe('Complex Module', () => {
  describe('constructor', () => {
    it('creates a complex number', () => {
      const c = new Complex(2, 3);
      expect(c.re).toBe(2);
      expect(c.im).toBe(3);
    });
    it('defaults imaginary part to 0', () => {
      const c = new Complex(2);
      expect(c.re).toBe(2);
      expect(c.im).toBe(0);
    });
  });

  describe('arithmetic', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);

    it('adds two complex numbers', () => {
      const res = c1.add(c2);
      expect(res.re).toBe(4);
      expect(res.im).toBe(6);
    });
    it('subtracts two complex numbers', () => {
      const res = c1.subtract(c2);
      expect(res.re).toBe(-2);
      expect(res.im).toBe(-2);
    });
    it('multiplies two complex numbers', () => {
      const res = c1.multiply(c2);
      // (1*3 - 2*4) = 3 - 8 = -5
      // (1*4 + 2*3) = 4 + 6 = 10
      expect(res.re).toBe(-5);
      expect(res.im).toBe(10);
    });
    it('divides two complex numbers', () => {
      const res = c1.divide(c2);
      // denom = 3^2 + 4^2 = 25
      // re = (1*3 + 2*4)/25 = 11/25 = 0.44
      // im = (2*3 - 1*4)/25 = 2/25 = 0.08
      expect(res.re).toBeCloseTo(0.44);
      expect(res.im).toBeCloseTo(0.08);
    });
    it('throws on division by zero', () => {
      const zero = new Complex(0, 0);
      expect(() => c1.divide(zero)).toThrow('Division by zero');
    });
  });

  describe('advanced properties', () => {
    const c = new Complex(3, 4);

    it('calculates magnitude', () => {
      expect(c.magnitude()).toBe(5);
    });
    it('calculates argument', () => {
      expect(c.argument()).toBeCloseTo(0.927); // atan2(4, 3)
    });
    it('calculates conjugate', () => {
      const conj = c.conjugate();
      expect(conj.re).toBe(3);
      expect(conj.im).toBe(-4);
    });
  });

  describe('advanced functions', () => {
    it('calculates sqrt', () => {
      const c = new Complex(-1, 0);
      const res = c.sqrt();
      expect(res.re).toBeCloseTo(0);
      expect(res.im).toBeCloseTo(1);
    });
    it('calculates exp', () => {
      const c = new Complex(0, Math.PI); // e^(i*pi) = -1
      const res = c.exp();
      expect(res.re).toBeCloseTo(-1);
      expect(res.im).toBeCloseTo(0);
    });
    it('calculates log', () => {
      const c = new Complex(0, 1);
      const res = c.log();
      expect(res.re).toBeCloseTo(0); // log(1)
      expect(res.im).toBeCloseTo(Math.PI / 2); // atan2(1, 0)
    });
  });

  describe('toString', () => {
    it('formats real numbers only', () => {
      const c = new Complex(5, 0);
      expect(c.toString()).toBe('5');
    });
    it('formats imaginary numbers only', () => {
      const c = new Complex(0, -3);
      expect(c.toString()).toBe('-3i');
    });
    it('formats full complex numbers', () => {
      const c1 = new Complex(1, 2);
      expect(c1.toString()).toBe('1+2i');
      const c2 = new Complex(1, -2);
      expect(c2.toString()).toBe('1-2i');
    });
  });
});
