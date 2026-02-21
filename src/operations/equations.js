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

  // Parse and solve simple expression (e.g., "2x + 5 = 15")
  solveExpression(equation) {
    const parts = equation.split('=');
    if (parts.length !== 2) {
      throw new Error('Invalid equation format. Use: ax + b = c');
    }
    
    // Simple parser for linear equations
    const left = parts[0].trim();
    const right = parseFloat(parts[1]);
    
    if (isNaN(right)) {
      throw new Error('Right side must be a number');
    }
    
    // Extract coefficient and constant
    let a = 0, b = 0;
    
    // Match pattern like "2x + 5" or "x - 3"
    const match = left.match(/(-?\d*\.?\d*)?\s*\*?\s*x\s*([+-]?\s*\d+\.?\d*)?/);
    
    if (match) {
      if (match[1] === '' || match[1] === '+') a = 1;
      else if (match[1] === '-') a = -1;
      else a = parseFloat(match[1]);
      
      if (match[2]) {
        b = parseFloat(match[2].replace(/\s/g, ''));
      }
    }
    
    // Move constant to right side: ax + b = right → ax = right - b
    b = b - right;
    
    return this.solveLinear(a, b);
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
