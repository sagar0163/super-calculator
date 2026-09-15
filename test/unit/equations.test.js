import { describe, it, expect } from 'vitest';
import EquationSolver from '../../src/operations/equations.js';

describe('EquationSolver Module', () => {
  const solver = new EquationSolver();

  describe('solveLinear', () => {
    it('solves simple linear equation', () => {
      const res = solver.solveLinear(2, -4);
      expect(res.type).toBe('linear');
      expect(res.x).toBe(2);
    });
    it('handles infinite solutions', () => {
      const res = solver.solveLinear(0, 0);
      expect(res.type).toBe('infinite');
    });
    it('handles no solutions', () => {
      const res = solver.solveLinear(0, 5);
      expect(res.type).toBe('none');
    });
  });

  describe('solveQuadratic', () => {
    it('solves when a = 0 (linear)', () => {
      const res = solver.solveQuadratic(0, 2, -4);
      expect(res.type).toBe('linear');
      expect(res.x).toBe(2);
    });
    it('solves with positive discriminant', () => {
      const res = solver.solveQuadratic(1, -5, 6); // x^2 - 5x + 6
      expect(res.type).toBe('quadratic');
      expect(res.discriminant).toBe('positive');
      expect(res.solutions).toEqual(expect.arrayContaining([3, 2]));
    });
    it('solves with zero discriminant', () => {
      const res = solver.solveQuadratic(1, -4, 4); // x^2 - 4x + 4
      expect(res.type).toBe('quadratic');
      expect(res.discriminant).toBe('zero');
      expect(res.solutions).toEqual([2]);
    });
    it('solves with negative discriminant (complex roots)', () => {
      const res = solver.solveQuadratic(1, 0, 4); // x^2 + 4
      expect(res.type).toBe('quadratic');
      expect(res.discriminant).toBe('negative');
      expect(res.complex).toContain('0+2i');
      expect(res.complex).toContain('0-2i');
    });
  });

  describe('solveExpression', () => {
    it('solves valid linear expression', () => {
      const res = solver.solveExpression('2x + 5 = 15');
      expect(res.x).toBe(5);
    });
    it('solves linear expression with negative coefficients', () => {
      const res = solver.solveExpression('-3x - 4 = 5');
      expect(res.x).toBe(-3);
    });
    it('solves expression with implicit coefficient 1', () => {
      const res = solver.solveExpression('x - 3 = 0');
      expect(res.x).toBe(3);
    });
    it('throws on invalid format (no equals)', () => {
      expect(() => solver.solveExpression('2x + 5')).toThrow('Invalid equation format');
    });
    it('throws if right side is not a number', () => {
      expect(() => solver.solveExpression('2x + 5 = abc')).toThrow('Right side must be a number');
    });
    it('handles malformed input somewhat gracefully', () => {
      // Assuming it falls back or returns NaN
      // It matches regex and if no match, a=0, b=-right
      const res = solver.solveExpression('garbage = 5');
      expect(res.type).toBe('none'); // a=0, b=-5
    });
  });

  describe('solveSystem', () => {
    it('solves 2x2 system with unique solution', () => {
      // 2x + y = 5 -> a1=2, b1=1, c1=5
      // x - y = 1  -> a2=1, b2=-1, c2=1
      // solution: x=2, y=1
      const res = solver.solveSystem(2, 1, 5, 1, -1, 1);
      expect(res.type).toBe('unique');
      expect(res.x).toBe(2);
      expect(res.y).toBe(1);
    });
    it('handles no unique solution (parallel lines)', () => {
      // 2x + y = 5
      // 4x + 2y = 10
      const res = solver.solveSystem(2, 1, 5, 4, 2, 10);
      expect(res.type).toBe('no-solution');
    });
  });
});
