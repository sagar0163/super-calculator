/**
 * Equation solver for linear and quadratic equations
 */

export class EquationSolver {
  // Solve linear equation ax + b = 0
  solveLinear(a, b) {
    if (a === 0) {
      if (b === 0) return { type: 'infinite', solutions: [] };
      return { type: 'none', solutions: [] };
    }
    const x = -b / a;
    return { type: 'linear', solutions: [x], x };
  }

  // Solve quadratic equation ax² + bx + c = 0
  solveQuadratic(a, b, c) {
    if (a === 0) return this.solveLinear(b, c);

    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return {
        type: 'quadratic',
        discriminant: 'positive',
        solutions: [x1, x2],
        x1, x2
      };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return {
        type: 'quadratic',
        discriminant: 'zero',
        solutions: [x],
        x
      };
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      return {
        type: 'quadratic',
        discriminant: 'negative',
        solutions: [], // Complex roots
        realPart,
        imagPart,
        complex: [`${realPart}+${imagPart}i`, `${realPart}-${imagPart}i`]
      };
    }
  }

  // Parse and solve simple expression (e.g., "2x + 5 = 15" or "x^2 - 4 = 0")
  solveExpression(equation) {
    const parts = equation.split('=');
    if (parts.length !== 2) {
      throw new Error('Invalid equation format. Use: ax + b = c or ax^2 + bx + c = 0');
    }

    const left = parts[0].trim();
    const right = parts[1].trim();

    // Move everything to left side: left - right = 0
    // Parse both sides
    const leftCoeffs = this._parsePolynomial(left);
    const rightCoeffs = this._parsePolynomial(right);

    const a = (leftCoeffs.a || 0) - (rightCoeffs.a || 0);
    const b = (leftCoeffs.b || 0) - (rightCoeffs.b || 0);
    const c = (leftCoeffs.c || 0) - (rightCoeffs.c || 0);

    if (a !== 0) {
      return this.solveQuadratic(a, b, c);
    }
    return this.solveLinear(b, c);
  }

  // Parse a polynomial string into coefficients { a, b, c }
  _parsePolynomial(expr) {
    let a = 0, b = 0, c = 0;
    expr = expr.replace(/\s+/g, '');

    // Tokenize: split into terms while preserving signs
    const terms = expr.match(/[+-]?[^+-]+/g) || [];

    for (const term of terms) {
      if (term.includes('x^2')) {
        const coeff = term.replace('x^2', '');
        if (coeff === '' || coeff === '+') a += 1;
        else if (coeff === '-') a -= 1;
        else a += parseFloat(coeff);
      } else if (term.includes('x')) {
        const coeff = term.replace('x', '');
        if (coeff === '' || coeff === '+') b += 1;
        else if (coeff === '-') b -= 1;
        else b += parseFloat(coeff);
      } else {
        c += parseFloat(term);
      }
    }

    return { a, b, c };
  }

  // System of linear equations (2 variables)
  solveSystem(a1, b1, c1, a2, b2, c2) {
    // a1*x + b1*y = c1
    // a2*x + b2*y = c2

    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
      return { type: 'no-solution' };
    }

    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;

    return { type: 'unique', solutions: { x, y }, x, y };
  }
}

export default EquationSolver;
