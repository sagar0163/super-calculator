declare module "super-calculator" {
  export class Complex {
    constructor(re: number, im: number);
    re: number;
    im: number;
    // other methods could go here
  }

  export class Matrix {
    constructor(data: number[][]);
    data: number[][];
    // other methods could go here
  }

  export class Calculator {
    constructor();
    evaluate(expression: string, variables?: Record<string, number>): number;
    complex(re: number, im: number): Complex;
    matrix(data: number[][]): Matrix;
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    modulo(a: number, b: number): number;
    power(base: number, exponent: number): number;
    sqrt(value: number): number;
    factorial(n: number): number;
    gcd(a: number, b: number): number;
    lcm(a: number, b: number): number;
    sin(degrees: number): number;
    cos(degrees: number): number;
    tan(degrees: number): number;
    asin(value: number): number;
    acos(value: number): number;
    atan(value: number): number;
    sinh(x: number): number;
    cosh(x: number): number;
    tanh(x: number): number;
    log(value: number, base: number): number;
    log10(value: number): number;
    log2(value: number): number;
    exp(x: number): number;
    abs(value: number): number;
    floor(value: number): number;
    ceil(value: number): number;
    round(value: number): number;
    toRadians(degrees: number): number;
    toDegrees(radians: number): number;
    roundTo(value: number, decimals: number): number;
    mean(values: number[]): number;
    median(values: number[]): number;
    mode(values: number[]): number;
    variance(values: number[], sample: number): number;
    stdDev(values: number[], sample: number): number;
    min(values: number[]): number;
    max(values: number[]): number;
    range(values: number[]): number;
    percentile(values: number[], p: number): number;
    quartiles(values: number[]): number;
    correlation(x: number, y: number): number;
    summary(values: number[]): number;
    simpleInterest(principal: number, rate: number, time: number): number;
    compoundInterest(principal: number, rate: number, time: number, frequency: number): number;
    emi(principal: number, annualRate: number, years: number): number;
    futureValue(principal: number, rate: number, time: number, compoundingFrequency: number): number;
    presentValue(futureValue: number, rate: number, time: number, compoundingFrequency: number): number;
    roi(initialInvestment: number, finalValue: number): number;
    cagr(initialValue: number, finalValue: number, years: number): number;
    npv(rate: number, cashFlows: number[]): number;
    profitMargin(revenue: number, cost: number): number;
    breakEven(fixedCosts: number, pricePerUnit: number, variableCostPerUnit: number): number;
    kmToMiles(km: number): number;
    milesToKm(miles: number): number;
    metersToFeet(m: number): number;
    feetToMeters(ft: number): number;
    cmToInches(cm: number): number;
    inchesToCm(inches: number): number;
    kgToPounds(kg: number): number;
    poundsToKg(lbs: number): number;
    gramsToOunces(g: number): number;
    ouncesToGrams(oz: number): number;
    celsiusToFahrenheit(c: number): number;
    fahrenheitToCelsius(f: number): number;
    celsiusToKelvin(c: number): number;
    kelvinToCelsius(k: number): number;
    litersToGallons(l: number): number;
    gallonsToLiters(gal: number): number;
    mlToFlOz(ml: number): number;
    bytesToKB(bytes: number): number;
    bytesToMB(bytes: number): number;
    bytesToGB(bytes: number): number;
    hoursToMinutes(h: number): number;
    minutesToSeconds(m: number): number;
    daysToHours(d: number): number;
    sqmToSqft(sqm: number): number;
    sqftToSqm(sqft: number): number;
    acresToHectares(acres: number): number;
    hectaresToAcres(ha: number): number;
    kmhToMph(kmh: number): number;
    mphToKmh(mph: number): number;
    msToKmh(ms: number): number;
    solveLinear(a: number, b: number): any;
    solveQuadratic(a: number, b: number, c: number): any;
    solveExpression(equation: string): any;
    solveSystem(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): any;
  }
  export default Calculator;
}
