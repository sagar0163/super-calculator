/**
 * Matrix operations
 */

export class Matrix {
  constructor(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid matrix data');
    }
    this.data = data;
    this.rows = data.length;
    this.cols = data[0].length;
  }

  // Create identity matrix
  static identity(size) {
    const data = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i === j ? 1 : 0);
      }
      data.push(row);
    }
    return new Matrix(data);
  }

  // Create zero matrix
  static zeros(rows, cols) {
    const data = Array(rows).fill(null).map(() => Array(cols).fill(0));
    return new Matrix(data);
  }

  // Matrix addition
  add(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error('Matrix dimensions must match');
    }
    const result = this.data.map((row, i) =>
      row.map((val, j) => val + other.data[i][j])
    );
    return new Matrix(result);
  }

  // Matrix multiplication
  multiply(other) {
    if (this.cols !== other.rows) {
      throw new Error('Invalid matrix dimensions for multiplication');
    }
    const result = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * other.data[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }
    return new Matrix(result);
  }

  // Scalar multiplication
  scalarMultiply(scalar) {
    const result = this.data.map(row => row.map(val => val * scalar));
    return new Matrix(result);
  }

  // Transpose
  transpose() {
    const result = [];
    for (let j = 0; j < this.cols; j++) {
      const row = [];
      for (let i = 0; i < this.rows; i++) {
        row.push(this.data[i][j]);
      }
      result.push(row);
    }
    return new Matrix(result);
  }

  // Determinant (2x2 and 3x3 only for simplicity)
  determinant() {
    if (this.rows !== this.cols) {
      throw new Error('Matrix must be square');
    }
    if (this.rows === 2) {
      return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
    }
    if (this.rows === 3) {
      const d = this.data;
      return d[0][0] * (d[1][1] * d[2][2] - d[1][2] * d[2][1])
           - d[0][1] * (d[1][0] * d[2][2] - d[1][2] * d[2][0])
           + d[0][2] * (d[1][0] * d[2][1] - d[1][1] * d[2][0]);
    }
    throw new Error('Determinant calculation only for 2x2 and 3x3');
  }

  // Inverse (2x2 only)
  inverse() {
    if (this.rows !== 2 || this.cols !== 2) {
      throw new Error('Inverse calculation only for 2x2 matrix');
    }
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix is singular, cannot invert');
    }
    const d = this.data;
    const invDet = 1 / det;
    return new Matrix([
      [d[1][1] * invDet, -d[0][1] * invDet],
      [-d[1][0] * invDet, d[0][0] * invDet]
    ]);
  }

  // String representation
  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

export default Matrix;
