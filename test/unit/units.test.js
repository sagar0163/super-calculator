import { describe, it, expect, vi, beforeEach } from 'vitest';
import Calculator from '../../src/index.js';
import { UnitConverter, CONVERSIONS } from '../../src/operations/units.js';

describe('UnitConverter.convert', () => {
  const { units } = new Calculator();

  it('converts km to miles (62.1371)', () => {
    expect(units.convert(100, 'km', 'miles')).toBe(62.1371);
  });

  it('converts miles to km', () => {
    expect(units.convert(1, 'miles', 'km')).toBeCloseTo(1.60934, 5);
  });

  it('chains conversions through intermediate units (km -> feet)', () => {
    expect(units.convert(100, 'km', 'feet')).toBeCloseTo(328084, 0);
  });

  it('chains miles -> feet directly', () => {
    expect(units.convert(1, 'miles', 'feet')).toBe(5280);
  });

  it('returns the value unchanged for same unit', () => {
    expect(units.convert(5, 'km', 'km')).toBe(5);
  });

  it('accepts unit aliases (metres -> feet, inches -> cm)', () => {
    expect(units.convert(10, 'metres', 'feet')).toBeCloseTo(32.80839895, 5);
    expect(units.convert(1, 'inches', 'cm')).toBe(2.54);
  });

  it('converts temperature in both directions', () => {
    expect(units.convert(100, 'celsius', 'fahrenheit')).toBe(212);
    expect(units.convert(212, 'fahrenheit', 'celsius')).toBe(100);
    expect(units.convert(0, 'celsius', 'kelvin')).toBeCloseTo(273.15, 4);
    expect(units.convert(0, 'kelvin', 'celsius')).toBeCloseTo(-273.15, 4);
  });

  it('converts weight', () => {
    expect(units.convert(2500, 'g', 'kg')).toBe(2.5);
    expect(units.convert(1, 'kg', 'pounds')).toBeCloseTo(2.20462, 5);
  });

  it('converts volume', () => {
    expect(units.convert(1, 'gallon', 'liter')).toBeCloseTo(3.78541, 5);
    expect(units.convert(1, 'liter', 'ml')).toBe(1000);
  });

  it('converts data', () => {
    expect(units.convert(1, 'gb', 'mb')).toBe(1024);
    expect(units.convert(1, 'mb', 'kb')).toBe(1024);
  });

  it('converts time', () => {
    expect(units.convert(2, 'hours', 'minutes')).toBe(120);
    expect(units.convert(1, 'minutes', 'seconds')).toBe(60);
  });

  it('converts area', () => {
    expect(units.convert(1, 'acre', 'hectare')).toBeCloseTo(0.404686, 5);
    expect(units.convert(1, 'sqm', 'sqft')).toBeCloseTo(10.7639, 4);
  });

  it('converts speed (km/h -> mph)', () => {
    expect(units.convert(100, 'km/h', 'mph')).toBeCloseTo(62.1371, 4);
  });

  it('throws on unknown unit', () => {
    expect(() => units.convert(1, 'parsec', 'km')).toThrow(/Unknown unit: "parsec"/);
    expect(() => units.convert(1, 'km', 'furlong')).toThrow(/Unknown unit: "furlong"/);
  });

  it('throws when converting across categories', () => {
    expect(() => units.convert(1, 'km', 'kg')).toThrow(/Cannot convert "km" \(length\) to "kg" \(weight\)/);
  });

  it('throws on non-numeric values', () => {
    expect(() => units.convert('abc', 'km', 'miles')).toThrow(/Invalid value/);
    expect(() => units.convert(Infinity, 'km', 'miles')).toThrow(/Invalid value/);
    expect(() => units.convert(NaN, 'km', 'miles')).toThrow(/Invalid value/);
  });
});

describe('UnitConverter deprecated methods', () => {
  const { units } = new Calculator();

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('still produce results', () => {
    expect(units.kmToMiles(10)).toBeCloseTo(6.21371, 5);
    expect(units.celsiusToFahrenheit(100)).toBe(212);
    expect(units.bytesToMB(1024 * 1024)).toBe(1);
  });

  it('emit a deprecation warning', () => {
    units.milesToKm(1);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('deprecated'));
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('convert(value'));
  });

  it('warns once per method', () => {
    units.metersToFeet(1);
    units.metersToFeet(2);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('has deprecation wrappers for every original method', () => {
    for (const name of [
      'kmToMiles', 'milesToKm', 'metersToFeet', 'feetToMeters', 'cmToInches',
      'inchesToCm', 'kgToPounds', 'poundsToKg', 'gramsToOunces', 'ouncesToGrams',
      'celsiusToFahrenheit', 'fahrenheitToCelsius', 'celsiusToKelvin', 'kelvinToCelsius',
      'litersToGallons', 'gallonsToLiters', 'mlToFlOz', 'bytesToKB', 'bytesToMB',
      'bytesToGB', 'hoursToMinutes', 'minutesToSeconds', 'daysToHours', 'sqmToSqft',
      'sqftToSqm', 'acresToHectares', 'hectaresToAcres', 'kmhToMph', 'mphToKmh', 'msToKmh',
    ]) {
      expect(typeof units[name]).toBe('function');
    }
  });
});

describe('UnitConverter table coverage', () => {
  it('covers length, weight, temperature, volume, data, time, area, speed', () => {
    expect(Object.keys(CONVERSIONS).sort()).toEqual([
      'area', 'data', 'length', 'speed', 'temperature', 'time', 'volume', 'weight',
    ]);
  });
});

describe('new UnitConverter() direct use', () => {
  it('works without a Calculator wrapper', () => {
    const converter = new UnitConverter();
    expect(converter.convert(1, 'm', 'cm')).toBe(100);
    expect(converter.listUnits()).toContain('km');
    expect(converter.listUnits()).toContain('fahrenheit');
  });
});