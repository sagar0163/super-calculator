# Super Calculator 🧮

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/npm-8+-green.svg" alt="npm">
</p>

A powerful, feature-rich calculator that solves complex mathematical problems. From basic arithmetic to advanced calculus, statistics, and financial calculations.

## Version 2.0 - Enhanced

### Features

| Category | Operations |
|----------|------------|
| **Basic** | +, -, ×, ÷, %, √, ^ |
| **Scientific** | sin, cos, tan, log, ln, exp |
| **Complex** | Complex number arithmetic |
| **Matrix** | Add, multiply, determinant, inverse |
| **Statistics** | Mean, median, std dev, variance |
| **Financial** | Compound interest, loan payments |
| **Units** | Length, weight, temperature, etc. |
| **Equations** | Linear & quadratic solver |

## Installation

```bash
# Clone and install
git clone https://github.com/sagar0163/super-calculator.git
cd super-calculator
npm install

# Link for CLI usage
npm link
```

## Usage

### CLI Commands

```bash
# Basic math
calc 2+2
calc "15 * 25 + 100"

# Scientific functions
calc "sin(45)"
calc "cos(90)"
calc "log(100)"
calc "sqrt(144)"

# Unit conversion
calc --convert 100 km to miles    # 100 km = 62.1371 miles
calc --convert "100 km to miles"  # quoted form works too
calc --convert 32 f to c          # 32 f = 0 c
calc --convert 1 gb to mb         # 1 gb = 1024 mb
calc --convert 1 gallon to liter  # 1 gallon = 3.7854 liter

# Statistics
calc --stats 1 2 3 4 5

# Equation solving
calc --solve "2x + 5 = 15"
calc --solve "x^2 - 4 = 0"
```

### Programmatic API

All operation modules are flattened onto the `Calculator` instance, so you can call
`add`, `sin`, `mean`, etc. directly.

```javascript
import Calculator from 'super-calculator';

const calc = new Calculator();

// Basic operations
calc.add(10, 5);        // 15
calc.subtract(10, 5);   // 5
calc.multiply(10, 5);   // 50
calc.divide(10, 5);     // 2

// Scientific
calc.sin(45);           // 0.7071...
calc.cos(45);
calc.sqrt(144);         // 12

// Statistics
calc.mean([1, 2, 3, 4, 5]); // 3

// Financial (rate is a percentage, e.g. 5 = 5%)
calc.simpleInterest(1000, 5, 10);       // 1500
calc.compoundInterest(1000, 5, 10);     // 1647.00...
calc.emi(200000, 6, 30);                // monthly payment

// Unit conversion (unified API)
calc.units.convert(100, 'km', 'miles');        // 62.1371
calc.units.convert(100, 'celsius', 'fahrenheit'); // 212
calc.units.convert(1, 'gb', 'mb');             // 1024

// Complex numbers
const z = calc.complex(3, 4);
z.magnitude();           // 5
z.conjugate();           // 3 - 4i

// Matrices
const m = calc.matrix([[1, 2], [3, 4]]);
m.rows;                  // 2
m.cols;                  // 2
m.determinant();         // -2
m.inverse();

// Equation solving
calc.solveExpression('2x + 5 = 15'); // { type: 'linear', solutions: [5] }
```

The sub-modules (`calc.basic`, `calc.scientific`, `calc.stats`, `calc.finance`,
`calc.units`, `calc.equations`) remain available for more targeted access.

Unit names are case-insensitive and accept aliases (`meters`, `metres`, `m`, `ft`, `lbs`, `oz`, `gb`, ...). Conversion chains through intermediate units automatically, so any two units of the same category work. Temperatures are handled with offsets (not factors). Unknown units or cross-category conversions throw a clear error.

Packaged TypeScript definitions (`index.d.ts`) give you full autocomplete and
type checking for every public method.

```typescript
import Calculator from 'super-calculator';

const calc = new Calculator();
const total: number = calc.add(10, 5);
const z = calc.complex(3, 4); // Complex
```

## Available Operations

All methods below are called directly on a `Calculator` instance (`calc.<method>`).

### Basic
- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction
- `multiply(a, b)` - Multiplication
- `divide(a, b)` - Division
- `modulo(a, b)` - Modulo
- `power(a, b)` - Exponent
- `sqrt(n)` - Square root
- `factorial(n)` - n!
- `gcd(a, b)`, `lcm(a, b)`

### Scientific
- `sin(deg)`, `cos(deg)`, `tan(deg)` - Degrees
- `asin(v)`, `acos(v)`, `atan(v)` - Return degrees
- `sinh(x)`, `cosh(x)`, `tanh(x)`
- `log(n, base?)` - Log with any base (natural log by default)
- `log10(n)`, `log2(n)`
- `exp(n)` - e^n
- `abs(n)`, `floor(n)`, `ceil(n)`, `round(n)`, `roundTo(n, decimals)`

### Statistics
- `mean(array)` - Average
- `median(array)` - Middle value
- `mode(array)` - Most common value(s), `null` if all distinct
- `stdDev(array, sample?)` - Standard deviation (sample by default)
- `variance(array, sample?)` - Variance (sample by default)
- `min(array)`, `max(array)`, `range(array)`
- `percentile(array, p)` - p in 0-100
- `quartiles(array)` - `{ q1, q2, q3 }`
- `correlation(x, y)` - Pearson correlation of two arrays
- `summary(array)` - Full statistical summary

### Financial (rates as percentages)
- `simpleInterest(principal, rate, time)`
- `compoundInterest(principal, rate, time, frequency?)`
- `emi(principal, annualRate, years)` - Monthly loan payment
- `futureValue(principal, rate, time, compoundingFrequency?)`
- `presentValue(futureValue, rate, time, compoundingFrequency?)`
- `roi(initialInvestment, finalValue)`
- `cagr(initialValue, finalValue, years)`
- `npv(rate, cashFlows)`
- `profitMargin(revenue, cost)`
- `breakEven(fixedCosts, pricePerUnit, variableCostPerUnit)`

### Complex
Create a complex number with `calc.complex(re, im)`. The returned `Complex`
instance supports `add`, `subtract`, `multiply`, `divide`, `magnitude`,
`argument`, `conjugate`, `sqrt`, `exp`, `log`, and `toString`.

### Matrix
Create a matrix with `calc.matrix(data)` or `Matrix.identity(size)` /
`Matrix.zeros(rows, cols)`. The returned `Matrix` instance supports `add`,
`multiply`, `scalarMultiply`, `transpose`, `determinant`, and `inverse`.

### Equations
- `solveLinear(a, b)` - Solves `ax + b = 0`
- `solveQuadratic(a, b, c)` - Solves `ax^2 + bx + c = 0`
- `solveExpression("2x + 5 = 15")` - Parses and solves an equation string
- `solveSystem(a1, b1, c1, a2, b2, c2)` - Two-variable linear system

### Units (unified API)
- `units.convert(value, from, to)` - Convert between any two units of the same category
- `units.listUnits()` - List all supported units
- Supported categories: **length** (km, miles, m, cm, mm, feet, inches, yards), **weight** (kg, g, mg, pounds, ounces, tonne), **temperature** (celsius, fahrenheit, kelvin), **volume** (liter, ml, gallon, fluid ounce, cup, cubic meter, cubic foot), **data** (byte, bit, kb, mb, gb, tb), **time** (second, minute, hour, day, week), **area** (sqm, sqft, hectare, acre, square km, square mile), **speed** (km/h, mph, m/s)

The old individual methods (`kmToMiles`, `milesToKm`, `celsiusToFahrenheit`, ...) still work but are **deprecated** — they emit a warning and delegate to `convert()`.

## Docker

```bash
# Build and run
docker-compose up -d

# Use in container
docker exec -it super-calculator calc "2+2"
```

## Testing

```bash
npm test
```

## Tech Stack

- Node.js
- JavaScript (ES6+)

## License

MIT

---

⭐ Star this repo if you find it useful!
