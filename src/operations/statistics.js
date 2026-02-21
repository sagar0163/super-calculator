/**
 * Statistical operations
 */

export class Statistics {
  // Mean (average)
  mean(values) {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Median
  median(values) {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Mode
  mode(values) {
    if (values.length === 0) return null;
    const freq = {};
    let maxFreq = 0;
    let modes = [];
    for (const val of values) {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) {
        maxFreq = freq[val];
        modes = [val];
      } else if (freq[val] === maxFreq) {
        modes.push(val);
      }
    }
    return modes.length === values.length ? null : modes;
  }

  // Variance
  variance(values) {
    if (values.length === 0) return 0;
    const avg = this.mean(values);
    const squaredDiffs = values.map(val => Math.pow(val - avg, 2));
    return this.mean(squaredDiffs);
  }

  // Standard Deviation
  stdDev(values) {
    return Math.sqrt(this.variance(values));
  }

  // Min/Max
  min(values) {
    return Math.min(...values);
  }

  max(values) {
    return Math.max(...values);
  }

  // Range
  range(values) {
    return this.max(values) - this.min(values);
  }

  // Percentile
  percentile(values, p) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return sorted[lower] * (upper - index) + sorted[upper] * (index - lower);
  }

  // Quartiles
  quartiles(values) {
    return {
      q1: this.percentile(values, 25),
      q2: this.percentile(values, 50),
      q3: this.percentile(values, 75)
    };
  }

  // Correlation coefficient
  correlation(x, y) {
    if (x.length !== y.length || x.length === 0) {
      throw new Error('Arrays must have same length');
    }
    const n = x.length;
    const meanX = this.mean(x);
    const meanY = this.mean(y);
    let num = 0, denX = 0, denY = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    return num / Math.sqrt(denX * denY);
  }

  // Summary
  summary(values) {
    return {
      count: values.length,
      mean: this.mean(values),
      median: this.median(values),
      mode: this.mode(values),
      stdDev: this.stdDev(values),
      min: this.min(values),
      max: this.max(values),
      range: this.range(values),
      ...this.quartiles(values)
    };
  }
}

export default Statistics;
