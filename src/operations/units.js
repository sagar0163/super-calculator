/**
 * Unit conversions
 *
 * Unified `convert(value, from, to)` API backed by a conversion factor
 * lookup table. Each unit maps directly to its close neighbors; reverse
 * edges are generated automatically so any two units in the same category
 * convert either directly or by chaining through intermediate units.
 * Temperature is affine (offset) rather than linear and is handled
 * specially.
 */

export const CONVERSIONS = {
  length: {
    units: {
      km: { miles: 0.621371, m: 1000, cm: 100000, mm: 1000000, feet: 3280.84, inches: 39370.1, yards: 1093.61 },
      miles: { km: 1.60934, m: 1609.34, cm: 160934, feet: 5280, inches: 63360, yards: 1760 },
      m: { km: 0.001, cm: 100, mm: 1000, feet: 3.28084, inches: 39.3701, yards: 1.09361 },
      cm: { m: 0.01, mm: 10, km: 0.00001, inches: 0.393701, feet: 0.0328084 },
      mm: { cm: 0.1, m: 0.001, inches: 0.0393701 },
      feet: { m: 0.3048, cm: 30.48, inches: 12, yards: 0.333333 },
      inches: { m: 0.0254, cm: 2.54, mm: 25.4, feet: 0.0833333 },
      yards: { m: 0.9144, feet: 3, cm: 91.44, inches: 36 },
    },
  },
  weight: {
    units: {
      kg: { g: 1000, mg: 1000000, pounds: 2.20462, ounces: 35.274, tonne: 0.001 },
      g: { kg: 0.001, mg: 1000, pounds: 0.00220462, ounces: 0.035274 },
      mg: { g: 0.001, kg: 0.000001 },
      pounds: { kg: 0.453592, g: 453.592, ounces: 16 },
      ounces: { g: 28.3495, kg: 0.0283495, pounds: 0.0625 },
      tonne: { kg: 1000, g: 1000000, pounds: 2204.62 },
    },
  },
  temperature: {
    type: 'affine',
    units: {
      celsius: { toBase: (v) => v, fromBase: (v) => v },
      fahrenheit: { toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      kelvin: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  volume: {
    units: {
      liter: { ml: 1000, 'cubic meter': 0.001, gallon: 0.264172, 'fluid ounce': 33.814, cup: 4.22675, 'cubic foot': 0.0353147 },
      ml: { liter: 0.001, 'fluid ounce': 0.033814, cup: 0.00422675, 'cubic meter': 0.000001 },
      'cubic meter': { liter: 1000, ml: 1000000, gallon: 264.172, 'cubic foot': 35.3147 },
      gallon: { liter: 3.78541, ml: 3785.41, 'fluid ounce': 128, cup: 16 },
      'fluid ounce': { ml: 29.5735, liter: 0.0295735, cup: 0.125 },
      cup: { liter: 0.236588, ml: 236.588, 'fluid ounce': 8, gallon: 0.0625 },
      'cubic foot': { liter: 28.3168, 'cubic meter': 0.0283168, gallon: 7.48052 },
    },
  },
  data: {
    units: {
      byte: { bit: 8, kb: 1 / 1024, mb: 1 / (1024 * 1024), gb: 1 / (1024 * 1024 * 1024), tb: 1 / (1024 * 1024 * 1024 * 1024) },
      bit: { byte: 0.125, kb: 1 / (8 * 1024), mb: 1 / (8 * 1024 * 1024) },
      kb: { byte: 1024, mb: 1 / 1024, gb: 1 / (1024 * 1024), tb: 1 / (1024 * 1024 * 1024) },
      mb: { byte: 1024 * 1024, kb: 1024, gb: 1 / 1024, tb: 1 / (1024 * 1024) },
      gb: { byte: 1024 * 1024 * 1024, mb: 1024, kb: 1024 * 1024, tb: 1 / 1024 },
      tb: { byte: 1024 * 1024 * 1024 * 1024, gb: 1024, mb: 1024 * 1024 },
    },
  },
  time: {
    units: {
      second: { minute: 1 / 60, hour: 1 / 3600, day: 1 / 86400, week: 1 / 604800 },
      minute: { second: 60, hour: 1 / 60, day: 1 / 1440 },
      hour: { minute: 60, second: 3600, day: 1 / 24, week: 1 / 168 },
      day: { hour: 24, minute: 1440, second: 86400, week: 1 / 7 },
      week: { day: 7, hour: 168, minute: 10080 },
    },
  },
  area: {
    units: {
      sqm: { sqft: 10.7639, hectare: 0.0001, acre: 0.000247105, 'square km': 0.000001, 'square mile': 3.86102e-7 },
      sqft: { sqm: 0.092903, acre: 0.0000229568, 'square km': 9.2903e-8, 'square mile': 3.58701e-8 },
      hectare: { acre: 2.47105, sqm: 10000, 'square km': 0.01, 'square mile': 0.00386102 },
      acre: { hectare: 0.404686, sqm: 4046.86, sqft: 43560, 'square mile': 0.0015625 },
      'square km': { hectare: 100, sqm: 1000000, acre: 247.105, 'square mile': 0.386102 },
      'square mile': { acre: 640, sqm: 2589988.11, sqft: 27878400, 'square km': 2.58998811 },
    },
  },
  speed: {
    units: {
      'km/h': { mph: 0.621371, 'm/s': 1 / 3.6 },
      mph: { 'km/h': 1.60934, 'm/s': 0.44704 },
      'm/s': { 'km/h': 3.6, mph: 2.23694 },
    },
  },
};

// Aliases so users can write km / kilometers / kilometres, m / meters, etc.
const UNIT_ALIASES = {
  kilometer: 'km',
  kilometre: 'km',
  kilometers: 'km',
  kilometres: 'km',
  meter: 'm',
  metre: 'm',
  meters: 'm',
  metres: 'm',
  centimeter: 'cm',
  centimetre: 'cm',
  centimeters: 'cm',
  centimetres: 'cm',
  millimeter: 'mm',
  millimetre: 'mm',
  millimeters: 'mm',
  millimetres: 'mm',
  mile: 'miles',
  foot: 'feet',
  ft: 'feet',
  inch: 'inches',
  in: 'inches',
  inche: 'inches',
  yard: 'yards',
  ton: 'tonne',
  tons: 'tonne',
  tonne: 'tonne',
  tonnes: 'tonne',
  kilogram: 'kg',
  kilograms: 'kg',
  gram: 'g',
  grams: 'g',
  milligram: 'mg',
  milligrams: 'mg',
  pound: 'pounds',
  lb: 'pounds',
  lbs: 'pounds',
  ounce: 'ounces',
  oz: 'ounces',
  centigrade: 'celsius',
  c: 'celsius',
  f: 'fahrenheit',
  k: 'kelvin',
  litre: 'liter',
  liters: 'liter',
  litres: 'liter',
  l: 'liter',
  milliliter: 'ml',
  millilitre: 'ml',
  milliliters: 'ml',
  millilitres: 'ml',
  'cubic meters': 'cubic meter',
  'cubic metre': 'cubic meter',
  'cubic metres': 'cubic meter',
  m3: 'cubic meter',
  gallons: 'gallon',
  gal: 'gallon',
  'fluid ounces': 'fluid ounce',
  'fl oz': 'fluid ounce',
  floz: 'fluid ounce',
  'cubic feet': 'cubic foot',
  ft3: 'cubic foot',
  cups: 'cup',
  bytes: 'byte',
  kilobyte: 'kb',
  kilobytes: 'kb',
  megabyte: 'mb',
  megabytes: 'mb',
  gigabyte: 'gb',
  gigabytes: 'gb',
  terabyte: 'tb',
  terabytes: 'tb',
  bits: 'bit',
  sec: 'second',
  secs: 'second',
  seconds: 'second',
  s: 'second',
  min: 'minute',
  mins: 'minute',
  minutes: 'minute',
  hr: 'hour',
  hrs: 'hour',
  hours: 'hour',
  h: 'hour',
  days: 'day',
  d: 'day',
  weeks: 'week',
  wk: 'week',
  'sq km': 'square km',
  'square kilometer': 'square km',
  'square kilometre': 'square km',
  squarekilometer: 'square km',
  sqkm: 'square km',
  ha: 'hectare',
  hectares: 'hectare',
  'square meter': 'sqm',
  'square metre': 'sqm',
  'square meters': 'sqm',
  'square metres': 'sqm',
  'sq meter': 'sqm',
  'square foot': 'sqft',
  'square feet': 'sqft',
  'sq foot': 'sqft',
  'sq feet': 'sqft',
  acres: 'acre',
  'square mile': 'square mile',
  'sq mile': 'square mile',
  'square miles': 'square mile',
  sqmiles: 'square mile',
  kmh: 'km/h',
  kph: 'km/h',
  kmhr: 'km/h',
  'm/h': 'mph',
  ms: 'm/s',
  mps: 'm/s',
};

function findUnit(unit) {
  for (const [categoryName, category] of Object.entries(CONVERSIONS)) {
    if (category.units[unit]) return { category: categoryName, unit };
  }
  return null;
}

function normalizeUnit(raw) {
  if (typeof raw !== 'string') return null;
  let unit = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  let found = findUnit(unit);
  if (found) return found;
  if (UNIT_ALIASES[unit]) {
    found = findUnit(UNIT_ALIASES[unit]);
    if (found) return found;
  }
  const singular = unit.replace(/ies$/, 'y').replace(/s$/, '');
  if (singular !== unit) {
    found = findUnit(singular);
    if (found) return found;
    if (UNIT_ALIASES[singular]) {
      found = findUnit(UNIT_ALIASES[singular]);
      if (found) return found;
    }
  }
  return null;
}

// Build an adjacency list (directed multistep graph) for each linear category,
// generating reverse edges automatically.
function buildGraph(category) {
  const graph = {};
  for (const [from, edges] of Object.entries(category.units)) {
    for (const [to, factor] of Object.entries(edges)) {
      graph[from] = graph[from] || {};
      graph[to] = graph[to] || {};
      graph[from][to] = factor;
      if (graph[to][from] === undefined) graph[to][from] = 1 / factor;
    }
  }
  return graph;
}

const GRAPHS = {};
for (const [categoryName, category] of Object.entries(CONVERSIONS)) {
  if (category.type === 'affine') continue;
  GRAPHS[categoryName] = buildGraph(category);
}

// Breadth-first chain through the factor graph. Returns the product of
// factors along the shortest edge path, or null if unreachable.
function chainFactor(graph, from, to) {
  if (graph[from][to]) return graph[from][to];
  const queue = [[from, 1]];
  const visited = new Set([from]);
  while (queue.length) {
    const [node, product] = queue.shift();
    for (const [next, factor] of Object.entries(graph[node])) {
      if (next === to) return product * factor;
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, product * factor]);
      }
    }
  }
  return null;
}

function roundResult(value, precision = 9) {
  const rounded = Number(value.toFixed(precision));
  return Object.is(rounded, -0) ? 0 : rounded;
}

export class UnitConverter {
  /**
   * Convert a value between two units of the same category.
   *
   * @param {number} value - numeric value to convert
   * @param {string} from - source unit (or alias)
   * @param {string} to - target unit (or alias)
   * @returns {number} converted value
   */
  convert(value, from, to) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error(`Invalid value for conversion: ${value}`);
    }
    const source = normalizeUnit(from);
    const target = normalizeUnit(to);
    if (!source) {
      throw new Error(`Unknown unit: "${from}". Use one of: ${this.listUnits().join(', ')}`);
    }
    if (!target) {
      throw new Error(`Unknown unit: "${to}". Use one of: ${this.listUnits().join(', ')}`);
    }
    if (source.category !== target.category) {
      throw new Error(
        `Cannot convert "${from}" (${source.category}) to "${to}" (${target.category})`
      );
    }
    if (source.unit === target.unit) return roundResult(value);

    const category = CONVERSIONS[source.category];
    if (category.type === 'affine') {
      const inBase = category.units[source.unit].toBase(value);
      return roundResult(category.units[target.unit].fromBase(inBase));
    }

    const factor = chainFactor(GRAPHS[source.category], source.unit, target.unit);
    if (factor === null) {
      throw new Error(`No conversion path from "${from}" to "${to}"`);
    }
    return roundResult(value * factor);
  }

  /**
   * List every canonical unit name.
   * @returns {string[]}
   */
  listUnits() {
    const names = [];
    for (const category of Object.values(CONVERSIONS)) {
      for (const unit of Object.keys(category.units)) names.push(unit);
    }
    return names;
  }
}

const DEPRECATED = {
  kmToMiles: ['km', 'miles'],
  milesToKm: ['miles', 'km'],
  metersToFeet: ['m', 'feet'],
  feetToMeters: ['feet', 'm'],
  cmToInches: ['cm', 'inches'],
  inchesToCm: ['inches', 'cm'],
  kgToPounds: ['kg', 'pounds'],
  poundsToKg: ['pounds', 'kg'],
  gramsToOunces: ['g', 'ounces'],
  ouncesToGrams: ['ounces', 'g'],
  celsiusToFahrenheit: ['celsius', 'fahrenheit'],
  fahrenheitToCelsius: ['fahrenheit', 'celsius'],
  celsiusToKelvin: ['celsius', 'kelvin'],
  kelvinToCelsius: ['kelvin', 'celsius'],
  litersToGallons: ['liter', 'gallon'],
  gallonsToLiters: ['gallon', 'liter'],
  mlToFlOz: ['ml', 'fluid ounce'],
  bytesToKB: ['byte', 'kb'],
  bytesToMB: ['byte', 'mb'],
  bytesToGB: ['byte', 'gb'],
  hoursToMinutes: ['hour', 'minute'],
  minutesToSeconds: ['minute', 'second'],
  daysToHours: ['day', 'hour'],
  sqmToSqft: ['sqm', 'sqft'],
  sqftToSqm: ['sqft', 'sqm'],
  acresToHectares: ['acre', 'hectare'],
  hectaresToAcres: ['hectare', 'acre'],
  kmhToMph: ['km/h', 'mph'],
  mphToKmh: ['mph', 'km/h'],
  msToKmh: ['m/s', 'km/h'],
};

const warned = new Set();

function deprecated(methodName, from, to) {
  return function deprecatedMethod(value) {
    if (!warned.has(methodName)) {
      warned.add(methodName);
      console.warn(
        `[deprecation] UnitConverter.${methodName}() is deprecated. ` +
        `Use convert(value, '${from}', '${to}') instead.`
      );
    }
    return this.convert(value, from, to);
  };
}

for (const [name, [from, to]] of Object.entries(DEPRECATED)) {
  UnitConverter.prototype[name] = deprecated(name, from, to);
}

export default UnitConverter;