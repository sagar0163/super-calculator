/**
 * Basic arithmetic operations
 */

export class BasicOperations {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  modulo(a, b) {
    if (b === 0) {
      throw new Error('Modulo by zero');
    }
    return a % b;
  }

  power(base, exponent) {
    return Math.pow(base, exponent);
  }

  sqrt(value) {
    if (value < 0) {
      throw new Error('Cannot take square root of negative number');
    }
    return Math.sqrt(value);
  }

  // Factorial
  factorial(n) {
    if (n < 0) {
      throw new Error('Factorial of negative number');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // Greatest Common Divisor
  gcd(a, b) {
    a = Math.abs(Math.floor(a));
    b = Math.abs(Math.floor(b));
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  // Least Common Multiple
  lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b);
  }
}

export default BasicOperations;
