import { describe, it, expect } from 'vitest';
import Matrix from '../../src/operations/matrix.js';

describe('Matrix Module', () => {
  describe('constructor and creation', () => {
    it('creates matrix from valid data', () => {
      const m = new Matrix([[1, 2], [3, 4]]);
      expect(m.rows).toBe(2);
      expect(m.cols).toBe(2);
      expect(m.data).toEqual([[1, 2], [3, 4]]);
    });
    it('throws on invalid data', () => {
      expect(() => new Matrix([])).toThrow('Invalid matrix data');
      expect(() => new Matrix('invalid')).toThrow();
    });
    it('creates identity matrix', () => {
      const id = Matrix.identity(3);
      expect(id.data).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]);
    });
    it('creates zero matrix', () => {
      const z = Matrix.zeros(2, 3);
      expect(z.data).toEqual([
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });
  });

  describe('addition', () => {
    it('adds two matrices correctly', () => {
      const m1 = new Matrix([[1, 2], [3, 4]]);
      const m2 = new Matrix([[5, 6], [7, 8]]);
      const m3 = m1.add(m2);
      expect(m3.data).toEqual([[6, 8], [10, 12]]);
    });
    it('throws if dimensions do not match', () => {
      const m1 = new Matrix([[1, 2], [3, 4]]);
      const m2 = new Matrix([[1, 2, 3], [4, 5, 6]]);
      expect(() => m1.add(m2)).toThrow('Matrix dimensions must match');
    });
  });

  describe('multiplication', () => {
    it('multiplies two matrices correctly', () => {
      const m1 = new Matrix([[1, 2], [3, 4]]);
      const m2 = new Matrix([[2, 0], [1, 2]]);
      const m3 = m1.multiply(m2);
      expect(m3.data).toEqual([[4, 4], [10, 8]]);
    });
    it('throws if inner dimensions do not match', () => {
      const m1 = new Matrix([[1, 2, 3]]);
      const m2 = new Matrix([[1, 2]]);
      expect(() => m1.multiply(m2)).toThrow('Invalid matrix dimensions for multiplication');
    });
  });

  describe('scalar multiplication', () => {
    it('multiplies matrix by a scalar', () => {
      const m1 = new Matrix([[1, -2], [0, 4]]);
      const m2 = m1.scalarMultiply(3);
      expect(m2.data).toEqual([[3, -6], [0, 12]]);
    });
  });

  describe('transpose', () => {
    it('transposes matrix correctly', () => {
      const m1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
      const m2 = m1.transpose();
      expect(m2.rows).toBe(3);
      expect(m2.cols).toBe(2);
      expect(m2.data).toEqual([[1, 4], [2, 5], [3, 6]]);
    });
  });

  describe('determinant', () => {
    it('calculates 2x2 determinant', () => {
      const m = new Matrix([[4, 6], [3, 8]]);
      expect(m.determinant()).toBe(14);
    });
    it('calculates 3x3 determinant', () => {
      const m = new Matrix([[6, 1, 1], [4, -2, 5], [2, 8, 7]]);
      expect(m.determinant()).toBe(-306);
    });
    it('throws on non-square matrix', () => {
      const m = new Matrix([[1, 2]]);
      expect(() => m.determinant()).toThrow('Matrix must be square');
    });
    it('throws on unsupported size', () => {
      const m = Matrix.zeros(4, 4);
      expect(() => m.determinant()).toThrow('Determinant calculation only for 2x2 and 3x3');
    });
  });

  describe('inverse', () => {
    it('calculates 2x2 inverse', () => {
      const m = new Matrix([[4, 7], [2, 6]]);
      const inv = m.inverse();
      expect(inv.data[0][0]).toBeCloseTo(0.6);
      expect(inv.data[0][1]).toBeCloseTo(-0.7);
      expect(inv.data[1][0]).toBeCloseTo(-0.2);
      expect(inv.data[1][1]).toBeCloseTo(0.4);
    });
    it('throws on non 2x2 matrix', () => {
      const m = Matrix.zeros(3, 3);
      expect(() => m.inverse()).toThrow('Inverse calculation only for 2x2 matrix');
    });
    it('throws on singular matrix', () => {
      const m = new Matrix([[2, 4], [1, 2]]);
      expect(() => m.inverse()).toThrow('Matrix is singular, cannot invert');
    });
  });

  describe('toString', () => {
    it('formats string properly', () => {
      const m = new Matrix([[1, 2], [3, 4]]);
      expect(m.toString()).toBe('1\t2\n3\t4');
    });
  });
});
