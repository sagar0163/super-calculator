import Calculator, { Complex, Matrix, type SummaryResult } from './index.js';

const calc = new Calculator();

const sum: number = calc.add(10, 5);
const sine: number = calc.sin(45);
const avg: number = calc.mean([1, 2, 3, 4, 5]);
const result: number = calc.evaluate('2 + 3');

const z: Complex = calc.complex(3, 4);
const zRe: number = z.re;
const zConj: Complex = z.conjugate();
const zStr: string = z.toString();

const m: Matrix = calc.matrix([[1, 2], [3, 4]]);
const rows: number = m.rows;
const det: number = m.determinant();
const mInverse: Matrix = m.inverse();
const t: Matrix = m.transpose();
const id: Matrix = Matrix.identity(3);

const sub: number = calc.basic.add(1, 2);
const trig: number = calc.scientific.sin(30);
const med: number = calc.stats.median([1, 2, 3]);
const apr: number = calc.finance.emi(100000, 6, 30);
const kmh: number = calc.units.kmhToMph(100);
const lin = calc.equations.solveLinear(2, -4);
const x: number | undefined = lin.type === 'linear' ? lin.x : undefined;

const summary: SummaryResult = calc.summary([1, 2, 3]);
const q1: number = summary.q1;

const opt: number = calc.compoundInterest(1000, 5, 1);
const popVar: number = calc.variance([1, 2, 3], false);
const coef: number = calc.correlation([1, 2, 3], [4, 5, 6]);
const logBase: number = calc.log(8, 2);