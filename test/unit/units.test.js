import { describe, it, expect } from 'vitest';
import UnitConverter from '../../src/operations/units.js';

describe('UnitConverter Module', () => {
  const uc = new UnitConverter();

  describe('Length', () => {
    it('converts km to miles', () => {
      expect(uc.kmToMiles(1)).toBeCloseTo(0.621371);
    });
    it('converts miles to km', () => {
      expect(uc.milesToKm(1)).toBeCloseTo(1.60934);
    });
    it('converts meters to feet', () => {
      expect(uc.metersToFeet(1)).toBeCloseTo(3.28084);
    });
    it('converts feet to meters', () => {
      expect(uc.feetToMeters(1)).toBeCloseTo(0.3048);
    });
    it('converts cm to inches', () => {
      expect(uc.cmToInches(1)).toBeCloseTo(0.393701);
    });
    it('converts inches to cm', () => {
      expect(uc.inchesToCm(1)).toBeCloseTo(2.54);
    });
  });

  describe('Weight/Mass', () => {
    it('converts kg to pounds', () => {
      expect(uc.kgToPounds(1)).toBeCloseTo(2.20462);
    });
    it('converts pounds to kg', () => {
      expect(uc.poundsToKg(1)).toBeCloseTo(0.453592);
    });
    it('converts grams to ounces', () => {
      expect(uc.gramsToOunces(1)).toBeCloseTo(0.035274);
    });
    it('converts ounces to grams', () => {
      expect(uc.ouncesToGrams(1)).toBeCloseTo(28.3495);
    });
  });

  describe('Temperature', () => {
    it('converts celsius to fahrenheit', () => {
      expect(uc.celsiusToFahrenheit(0)).toBe(32);
      expect(uc.celsiusToFahrenheit(100)).toBe(212);
    });
    it('converts fahrenheit to celsius', () => {
      expect(uc.fahrenheitToCelsius(32)).toBe(0);
      expect(uc.fahrenheitToCelsius(212)).toBe(100);
    });
    it('converts celsius to kelvin', () => {
      expect(uc.celsiusToKelvin(0)).toBeCloseTo(273.15);
    });
    it('converts kelvin to celsius', () => {
      expect(uc.kelvinToCelsius(273.15)).toBeCloseTo(0);
    });
  });

  describe('Volume', () => {
    it('converts liters to gallons', () => {
      expect(uc.litersToGallons(1)).toBeCloseTo(0.264172);
    });
    it('converts gallons to liters', () => {
      expect(uc.gallonsToLiters(1)).toBeCloseTo(3.78541);
    });
    it('converts ml to fl oz', () => {
      expect(uc.mlToFlOz(1)).toBeCloseTo(0.033814);
    });
  });

  describe('Data', () => {
    it('converts bytes to KB', () => {
      expect(uc.bytesToKB(1024)).toBe(1);
    });
    it('converts bytes to MB', () => {
      expect(uc.bytesToMB(1024 * 1024)).toBe(1);
    });
    it('converts bytes to GB', () => {
      expect(uc.bytesToGB(1024 * 1024 * 1024)).toBe(1);
    });
  });

  describe('Time', () => {
    it('converts hours to minutes', () => {
      expect(uc.hoursToMinutes(1)).toBe(60);
    });
    it('converts minutes to seconds', () => {
      expect(uc.minutesToSeconds(1)).toBe(60);
    });
    it('converts days to hours', () => {
      expect(uc.daysToHours(1)).toBe(24);
    });
  });

  describe('Area', () => {
    it('converts sqm to sqft', () => {
      expect(uc.sqmToSqft(1)).toBeCloseTo(10.7639);
    });
    it('converts sqft to sqm', () => {
      expect(uc.sqftToSqm(10.7639)).toBeCloseTo(1);
    });
    it('converts acres to hectares', () => {
      expect(uc.acresToHectares(1)).toBeCloseTo(0.404686);
    });
    it('converts hectares to acres', () => {
      expect(uc.hectaresToAcres(1)).toBeCloseTo(2.47105);
    });
  });

  describe('Speed', () => {
    it('converts kmh to mph', () => {
      expect(uc.kmhToMph(1)).toBeCloseTo(0.621371);
    });
    it('converts mph to kmh', () => {
      expect(uc.mphToKmh(1)).toBeCloseTo(1.60934);
    });
    it('converts ms to kmh', () => {
      expect(uc.msToKmh(10)).toBe(36);
    });
  });
});
