import { describe, it, expect } from 'vitest';
import Statistics from '../../src/operations/statistics.js';

describe('Statistics', () => {
  const stats = new Statistics();

  it('should calculate mean', () => {
    expect(stats.mean([1, 2, 3, 4, 5])).toBe(3);
    expect(stats.mean([])).toBe(0);
    expect(stats.mean([-1, -2, -3])).toBe(-2);
  });

  it('should calculate median', () => {
    expect(stats.median([1, 2, 3, 4, 5])).toBe(3);
    expect(stats.median([1, 2, 3, 4])).toBe(2.5);
    expect(stats.median([])).toBe(0);
  });

  it('should calculate mode', () => {
    expect(stats.mode([1, 2, 2, 3])).toEqual([2]);
    expect(stats.mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
    expect(stats.mode([1, 2, 3])).toBeNull();
    expect(stats.mode([])).toBeNull();
  });

  it('should calculate variance', () => {
    expect(stats.variance([1, 2, 3, 4, 5])).toBe(2);
    expect(stats.variance([2, 2, 2])).toBe(0);
    expect(stats.variance([])).toBe(0);
  });

  it('should calculate standard deviation', () => {
    expect(stats.stdDev([1, 2, 3, 4, 5])).toBeCloseTo(1.414);
    expect(stats.stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
    expect(stats.stdDev([])).toBe(0);
  });

  it('should calculate min and max', () => {
    expect(stats.min([1, 2, 3])).toBe(1);
    expect(stats.max([1, 2, 3])).toBe(3);
    expect(stats.min([-5, 0, 5])).toBe(-5);
    expect(stats.max([-5, 0, 5])).toBe(5);
  });

  it('should calculate range', () => {
    expect(stats.range([1, 2, 3, 4, 5])).toBe(4);
    expect(stats.range([-5, 0, 5])).toBe(10);
  });

  it('should calculate percentile', () => {
    expect(stats.percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    expect(stats.percentile([1, 2, 3, 4, 5], 25)).toBe(2);
    expect(stats.percentile([1, 2, 3, 4, 5], 75)).toBe(4);
  });

  it('should calculate quartiles', () => {
    expect(stats.quartiles([1, 2, 3, 4, 5])).toEqual({
      q1: 2,
      q2: 3,
      q3: 4
    });
  });

  it('should calculate correlation', () => {
    expect(stats.correlation([1, 2, 3], [1, 2, 3])).toBe(1);
    expect(stats.correlation([1, 2, 3], [3, 2, 1])).toBe(-1);
    expect(() => stats.correlation([1, 2], [1, 2, 3])).toThrow('Arrays must have same length');
    expect(() => stats.correlation([], [])).toThrow('Arrays must have same length');
  });

  it('should calculate summary', () => {
    const summary = stats.summary([1, 2, 3, 4, 5]);
    expect(summary.count).toBe(5);
    expect(summary.mean).toBe(3);
    expect(summary.median).toBe(3);
    expect(summary.mode).toBeNull();
    expect(summary.stdDev).toBeCloseTo(1.414);
    expect(summary.min).toBe(1);
    expect(summary.max).toBe(5);
    expect(summary.range).toBe(4);
    expect(summary.q1).toBe(2);
    expect(summary.q2).toBe(3);
    expect(summary.q3).toBe(4);
  });
});
