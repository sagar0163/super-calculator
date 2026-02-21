/**
 * Scientific trigonometric and advanced operations
 */

export class ScientificOperations {
  // Trigonometric functions (degrees)
  sin(degrees) {
    return Math.sin(this.toRadians(degrees));
  }

  cos(degrees) {
    return Math.cos(this.toRadians(degrees));
  }

  tan(degrees) {
    return Math.tan(this.toRadians(degrees));
  }

  // Inverse trigonometric functions
  asin(value) {
    return this.toDegrees(Math.asin(value));
  }

  acos(value) {
    return this.toDegrees(Math.acos(value));
  }

  atan(value) {
    return this.toDegrees(Math.atan(value));
  }

  // Hyperbolic functions
  sinh(x) {
    return Math.sinh(x);
  }

  cosh(x) {
    return Math.cosh(x);
  }

  tanh(x) {
    return Math.tanh(x);
  }

  // Logarithmic functions
  log(value, base = Math.E) {
    if (value <= 0) {
      throw new Error('Logarithm of non-positive number');
    }
    return Math.log(value) / Math.log(base);
  }

  log10(value) {
    return Math.log10(value);
  }

  log2(value) {
    return Math.log2(value);
  }

  // Exponential
  exp(x) {
    return Math.exp(x);
  }

  // Absolute value
  abs(value) {
    return Math.abs(value);
  }

  // Floor, Ceil, Round
  floor(value) {
    return Math.floor(value);
  }

  ceil(value) {
    return Math.ceil(value);
  }

  round(value) {
    return Math.round(value);
  }

  // Helper: degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Helper: radians to degrees
  toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  // Ceiling/Floor to specific precision
  roundTo(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}

export default ScientificOperations;
