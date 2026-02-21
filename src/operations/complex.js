/**
 * Complex number operations
 */

export class Complex {
  constructor(re, im = 0) {
    this.re = re;
    this.im = im;
  }

  // Addition
  add(other) {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  // Subtraction
  subtract(other) {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  // Multiplication
  multiply(other) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  // Division
  divide(other) {
    const denom = other.re * other.re + other.im * other.im;
    if (denom === 0) {
      throw new Error('Division by zero');
    }
    return new Complex(
      (this.re * other.re + this.im * other.im) / denom,
      (this.im * other.re - this.re * other.im) / denom
    );
  }

  // Magnitude
  magnitude() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  // Argument (phase)
  argument() {
    return Math.atan2(this.im, this.re);
  }

  // Conjugate
  conjugate() {
    return new Complex(this.re, -this.im);
  }

  // Square root
  sqrt() {
    const r = this.magnitude();
    const theta = this.argument();
    const sqrtR = Math.sqrt(r);
    return new Complex(
      sqrtR * Math.cos(theta / 2),
      sqrtR * Math.sin(theta / 2)
    );
  }

  // Exponential
  exp() {
    const expRe = Math.exp(this.re);
    return new Complex(expRe * Math.cos(this.im), expRe * Math.sin(this.im));
  }

  // Natural logarithm
  log() {
    return new Complex(Math.log(this.magnitude()), this.argument());
  }

  // String representation
  toString() {
    if (this.im === 0) return `${this.re}`;
    if (this.re === 0) return `${this.im}i`;
    const sign = this.im >= 0 ? '+' : '';
    return `${this.re}${sign}${this.im}i`;
  }
}

export default Complex;
