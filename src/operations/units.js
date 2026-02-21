/**
 * Unit conversions
 */

export class UnitConverter {
  // Length
  kmToMiles(km) { return km * 0.621371; }
  milesToKm(miles) { return miles * 1.60934; }
  metersToFeet(m) { return m * 3.28084; }
  feetToMeters(ft) { return ft * 0.3048; }
  cmToInches(cm) { return cm * 0.393701; }
  inchesToCm(inches) { return inches * 2.54; }

  // Weight/Mass
  kgToPounds(kg) { return kg * 2.20462; }
  poundsToKg(lbs) { return lbs * 0.453592; }
  gramsToOunces(g) { return g * 0.035274; }
  ouncesToGrams(oz) { return oz * 28.3495; }

  // Temperature
  celsiusToFahrenheit(c) { return (c * 9/5) + 32; }
  fahrenheitToCelsius(f) { return (f - 32) * 5/9; }
  celsiusToKelvin(c) { return c + 273.15; }
  kelvinToCelsius(k) { return k - 273.15; }

  // Volume
  litersToGallons(l) { return l * 0.264172; }
  gallonsToLiters(gal) { return gal * 3.78541; }
  mlToFlOz(ml) { return ml * 0.033814; }

  // Data
  bytesToKB(bytes) { return bytes / 1024; }
  bytesToMB(bytes) { return bytes / (1024 * 1024); }
  bytesToGB(bytes) { return bytes / (1024 * 1024 * 1024); }

  // Time
  hoursToMinutes(h) { return h * 60; }
  minutesToSeconds(m) { return m * 60; }
  daysToHours(d) { return d * 24; }

  // Area
  sqmToSqft(sqm) { return sqm * 10.7639; }
  sqftToSqm(sqft) { return sqft / 10.7639; }
  acresToHectares(acres) { return acres * 0.404686; }
  hectaresToAcres(ha) { return ha * 2.47105; }

  // Speed
  kmhToMph(kmh) { return kmh * 0.621371; }
  mphToKmh(mph) { return mph * 1.60934; }
  msToKmh(ms) { return ms * 3.6; }
}

export default UnitConverter;
