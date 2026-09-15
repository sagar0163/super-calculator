import { describe, it, expect } from 'vitest';
import ScientificOperations from '../../src/operations/scientific.js';

describe('ScientificOperations Module', () => {
  const sci = new ScientificOperations();

  describe('Trigonometric functions (degrees)', () => {
    it('calculates sin correctly', () => {
      expect(sci.sin(0)).toBeCloseTo(0);
      expect(sci.sin(90)).toBeCloseTo(1);
      expect(sci.sin(30)).toBeCloseTo(0.5);
    });
    it('calculates cos correctly', () => {
      expect(sci.cos(0)).toBeCloseTo(1);
      expect(sci.cos(90)).toBeCloseTo(0);
      expect(sci.cos(60)).toBeCloseTo(0.5);
    });
    it('calculates tan correctly', () => {
      expect(sci.tan(0)).toBeCloseTo(0);
      expect(sci.tan(45)).toBeCloseTo(1);
    });
  });

  describe('Inverse Trigonometric functions', () => {
    it('calculates asin correctly', () => {
      expect(sci.asin(0)).toBeCloseTo(0);
      expect(sci.asin(1)).toBeCloseTo(90);
    });
    it('calculates acos correctly', () => {
      expect(sci.acos(1)).toBeCloseTo(0);
      expect(sci.acos(0)).toBeCloseTo(90);
    });
    it('calculates atan correctly', () => {
      expect(sci.atan(0)).toBeCloseTo(0);
      expect(sci.atan(1)).toBeCloseTo(45);
    });
  });

  describe('Hyperbolic functions', () => {
    it('calculates sinh correctly', () => {
      expect(sci.sinh(0)).toBe(0);
    });
    it('calculates cosh correctly', () => {
      expect(sci.cosh(0)).toBe(1);
    });
    it('calculates tanh correctly', () => {
      expect(sci.tanh(0)).toBe(0);
    });
  });

  describe('Logarithmic functions', () => {
    it('calculates natural log correctly', () => {
      expect(sci.log(Math.E)).toBeCloseTo(1);
      expect(sci.log(1)).toBeCloseTo(0);
    });
    it('throws on non-positive log', () => {
      expect(() => sci.log(0)).toThrow('Logarithm of non-positive number');
      expect(() => sci.log(-1)).toThrow('Logarithm of non-positive number');
    });
    it('calculates log with custom base', () => {
      expect(sci.log(100, 10)).toBeCloseTo(2);
    });
    it('calculates log10 correctly', () => {
      expect(sci.log10(100)).toBeCloseTo(2);
    });
    it('calculates log2 correctly', () => {
      expect(sci.log2(8)).toBeCloseTo(3);
    });
  });

  describe('Exponential and absolute value', () => {
    it('calculates exp correctly', () => {
      expect(sci.exp(0)).toBe(1);
      expect(sci.exp(1)).toBeCloseTo(Math.E);
    });
    it('calculates abs correctly', () => {
      expect(sci.abs(-5)).toBe(5);
      expect(sci.abs(5)).toBe(5);
    });
  });

  describe('Rounding functions', () => {
    it('calculates floor, ceil, round correctly', () => {
      expect(sci.floor(4.9)).toBe(4);
      expect(sci.ceil(4.1)).toBe(5);
      expect(sci.round(4.5)).toBe(5);
      expect(sci.round(4.4)).toBe(4);
    });
    it('rounds to specific precision', () => {
      expect(sci.roundTo(4.1234, 2)).toBe(4.12);
      expect(sci.roundTo(4.125, 2)).toBe(4.13);
    });
  });
});
