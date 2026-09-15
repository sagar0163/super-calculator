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

# Complex numbers
calc "complex(3,4) + complex(1,2)"

# Statistics
calc --stats "1,2,3,4,5"

# Unit conversion
calc --convert 100 km to miles    # 100 km = 62.1371 miles
calc --convert "100 km to miles"  # quoted form works too
calc --convert 32 f to c          # 32 f = 0 c
calc --convert 1 gb to mb         # 1 gb = 1024 mb
calc --convert 1 gallon to liter  # 1 gallon = 3.7854 liter

# Equation solving
calc --solve "2x + 5 = 15"
calc --solve "x^2 - 4 = 0"

# Matrix
calc --matrix "[1,2],[3,4] * [5,6],[7,8]"
```

### Programmatic API

```javascript
const calculator = require('./src/index.js');

// Basic operations
calculator.add(10, 5);      // 15
calculator.subtract(10, 5); // 5
calculator.multiply(10, 5); // 50
calculator.divide(10, 5);   // 2

// Scientific
calculator.sin(45);
calculator.cos(45);
calculator.sqrt(144);

// Statistics
calculator.mean([1, 2, 3, 4, 5]);  // 3

// Financial
calculator.compoundInterest(1000, 0.05, 10);
calculator.loanPayment(200000, 0.06, 30);

// Unit conversion (unified API)
calculator.units.convert(100, 'km', 'miles');    // 62.1371
calculator.units.convert(1, 'miles', 'feet');    // 5280
calculator.units.convert(100, 'celsius', 'fahrenheit'); // 212
calculator.units.convert(1, 'gb', 'mb');         // 1024
```

Unit names are case-insensitive and accept aliases (`meters`, `metres`, `m`, `ft`, `lbs`, `oz`, `gb`, ...). Conversion chains through intermediate units automatically, so any two units of the same category work. Temperatures are handled with offsets (not factors). Unknown units or cross-category conversions throw a clear error.

## Available Operations

### Basic
- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction  
- `multiply(a, b)` - Multiplication
- `divide(a, b)` - Division
- `mod(a, b)` - Modulo
- `power(a, b)` - Exponent
- `sqrt(n)` - Square root
- `root(n, x)` - nth root

### Scientific
- `sin(angle)`, `cos(angle)`, `tan(angle)`
- `asin(angle)`, `acos(angle)`, `atan(angle)`
- `log(n)` - Base 10 log
- `ln(n)` - Natural log
- `exp(n)` - e^n
- `factorial(n)` - n!

### Statistics
- `mean(array)` - Average
- `median(array)` - Middle value
- `mode(array)` - Most common
- `stdDev(array)` - Standard deviation
- `variance(array)` - Variance
- `min(array)`, `max(array)`

### Financial
- `compoundInterest(principal, rate, time)`
- `simpleInterest(principal, rate, time)`
- `loanPayment(principal, rate, years)`
- `futureValue(present, rate, periods)`

### Matrix
- `matrixAdd(A, B)`
- `matrixMultiply(A, B)`
- `matrixDeterminant(A)`
- `matrixInverse(A)`
- `matrixTranspose(A)`

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
# Update
