import { describe, it, expect } from 'vitest';
import Financial from '../../src/operations/financial.js';

describe('Financial Module', () => {
  const fin = new Financial();

  describe('simpleInterest', () => {
    it('calculates simple interest correctly', () => {
      expect(fin.simpleInterest(1000, 5, 2)).toBeCloseTo(1100);
    });
    it('handles zero principal', () => {
      expect(fin.simpleInterest(0, 5, 2)).toBe(0);
    });
    it('handles negative rates', () => {
      expect(fin.simpleInterest(1000, -5, 2)).toBeCloseTo(900);
    });
  });

  describe('compoundInterest', () => {
    it('calculates compound interest correctly', () => {
      expect(fin.compoundInterest(1000, 5, 2, 1)).toBeCloseTo(1102.5);
    });
    it('uses default frequency of 12', () => {
      expect(fin.compoundInterest(1000, 5, 2)).toBeCloseTo(1104.94);
    });
    it('handles zero principal', () => {
      expect(fin.compoundInterest(0, 5, 2)).toBe(0);
    });
  });

  describe('emi', () => {
    it('calculates EMI correctly', () => {
      expect(fin.emi(100000, 10, 5)).toBeCloseTo(2124.70);
    });
    it('handles zero interest rate', () => {
      expect(fin.emi(100000, 0, 5)).toBeCloseTo(100000 / 60);
    });
    it('handles zero principal', () => {
      expect(fin.emi(0, 10, 5)).toBe(0);
    });
  });

  describe('futureValue', () => {
    it('calculates future value correctly', () => {
      expect(fin.futureValue(1000, 5, 2, 1)).toBeCloseTo(1102.5);
    });
  });

  describe('presentValue', () => {
    it('calculates present value correctly', () => {
      expect(fin.presentValue(1102.5, 5, 2, 1)).toBeCloseTo(1000);
    });
  });

  describe('roi', () => {
    it('calculates ROI correctly', () => {
      expect(fin.roi(1000, 1200)).toBeCloseTo(20);
    });
    it('handles zero initial investment', () => {
      expect(fin.roi(0, 1200)).toBe(0);
    });
    it('handles negative return', () => {
      expect(fin.roi(1000, 800)).toBeCloseTo(-20);
    });
  });

  describe('cagr', () => {
    it('calculates CAGR correctly', () => {
      expect(fin.cagr(10000, 14641, 4)).toBeCloseTo(10);
    });
    it('handles zero initial value or years', () => {
      expect(fin.cagr(0, 14641, 4)).toBe(0);
      expect(fin.cagr(10000, 14641, 0)).toBe(0);
    });
  });

  describe('npv', () => {
    it('calculates NPV correctly', () => {
      expect(fin.npv(10, [100, 100, 100])).toBeCloseTo(248.685);
    });
    it('handles empty cash flows', () => {
      expect(fin.npv(10, [])).toBe(0);
    });
  });

  describe('profitMargin', () => {
    it('calculates profit margin correctly', () => {
      expect(fin.profitMargin(1000, 800)).toBeCloseTo(20);
    });
    it('handles zero revenue', () => {
      expect(fin.profitMargin(0, 800)).toBe(0);
    });
  });

  describe('breakEven', () => {
    it('calculates break-even point correctly', () => {
      expect(fin.breakEven(1000, 50, 30)).toBe(50);
    });
    it('handles negative contribution margin', () => {
      expect(fin.breakEven(1000, 30, 50)).toBe(Infinity);
    });
  });
});
