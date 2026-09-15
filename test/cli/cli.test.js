import { describe, it, expect } from 'vitest';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '../../src/cli.js');

function run(args) {
  return execFileSync(process.execPath, [CLI, ...args], { encoding: 'utf-8' }).trim();
}

describe('CLI --convert', () => {
  it('converts km to miles', () => {
    expect(run(['--convert', '100', 'km', 'to', 'miles'])).toBe('100 km = 62.1371 miles');
  });

  it('supports the quoted natural form', () => {
    expect(run(['--convert', '100 km to miles'])).toBe('100 km = 62.1371 miles');
  });

  it('supports omitting the "to" keyword', () => {
    expect(run(['--convert', '100', 'km', 'miles'])).toBe('100 km = 62.1371 miles');
  });

  it('converts temperature', () => {
    expect(run(['--convert', '32', 'f', 'to', 'c'])).toBe('32 f = 0 c');
  });

  it('converts data units', () => {
    expect(run(['--convert', '1', 'gb', 'to', 'mb'])).toBe('1 gb = 1024 mb');
  });

  it('errors with an unknown unit', () => {
    expect(() => run(['--convert', '1', 'x', 'to', 'y'])).toThrow(/Unknown unit: "x"/);
  });

  it('errors on cross-category conversion', () => {
    expect(() => run(['--convert', '1', 'km', 'to', 'kg'])).toThrow(/Cannot convert/);
  });

  it('errors on missing arguments', () => {
    expect(() => run(['--convert'])).toThrow(/Usage: calc --convert/);
    expect(() => run(['--convert', '100'])).toThrow(/Usage: calc --convert/);
  });

  it('does not break normal calculation mode', () => {
    expect(run(['2', '+', '2'])).toBe('2 + 2 = 4');
  });
});

describe('CLI --stats', () => {
  it('accepts comma-separated values as a single argument', () => {
    const out = run(['--stats', '1,2,3,4,5']);
    expect(out).toMatch(/mean/);
    expect(out).toMatch(/3/);
  });

  it('accepts space-separated values', () => {
    const out = run(['--stats', '1', '2', '3', '4', '5']);
    expect(out).toMatch(/mean/);
    expect(out).toMatch(/3/);
  });

  it('errors when no numbers are given', () => {
    expect(() => run(['--stats'])).toThrow(/Please provide numbers for statistics/);
  });
});