/**
 * Financial calculations
 */

export class Financial {
  // Simple Interest
  simpleInterest(principal, rate, time) {
    if (principal < 0) throw new Error('Principal must be non-negative');
    if (rate <= 0) throw new Error('Rate must be positive');
    if (time < 0) throw new Error('Time must be non-negative');
    return principal * (1 + (rate / 100) * time);
  }

  // Compound Interest
  compoundInterest(principal, rate, time, frequency = 12) {
    if (principal < 0) throw new Error('Principal must be non-negative');
    if (rate <= 0) throw new Error('Rate must be positive');
    if (time < 0) throw new Error('Time must be non-negative');
    if (frequency <= 0) throw new Error('Compounding frequency must be positive');
    return principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  }

  // Loan EMI
  emi(principal, annualRate, years) {
    if (principal <= 0) throw new Error('Principal must be positive');
    if (annualRate < 0) throw new Error('Annual rate must be non-negative');
    if (years <= 0) throw new Error('Loan term must be positive');
    const monthlyRate = annualRate / (12 * 100);
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
  }

  // Future Value
  futureValue(principal, rate, time, compoundingFrequency = 12) {
    if (principal < 0) throw new Error('Principal must be non-negative');
    if (rate <= 0) throw new Error('Rate must be positive');
    if (time < 0) throw new Error('Time must be non-negative');
    if (compoundingFrequency <= 0) throw new Error('Compounding frequency must be positive');
    return principal * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
  }

  // Present Value
  presentValue(futureValue, rate, time, compoundingFrequency = 12) {
    if (futureValue < 0) throw new Error('Future value must be non-negative');
    if (rate <= 0) throw new Error('Rate must be positive');
    if (time < 0) throw new Error('Time must be non-negative');
    if (compoundingFrequency <= 0) throw new Error('Compounding frequency must be positive');
    return futureValue / Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
  }

  // ROI (Return on Investment)
  roi(initialInvestment, finalValue) {
    if (initialInvestment < 0) throw new Error('Initial investment must be non-negative');
    if (initialInvestment === 0) return 0;
    return ((finalValue - initialInvestment) / initialInvestment) * 100;
  }

  // CAGR (Compound Annual Growth Rate)
  cagr(initialValue, finalValue, years) {
    if (initialValue <= 0) throw new Error('Initial value must be positive');
    if (years <= 0) throw new Error('Years must be positive');
    if (finalValue <= 0) throw new Error('Final value must be positive');
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  }

  // Discounted Cash Flow (simple)
  npv(rate, cashFlows) {
    if (rate <= 0) throw new Error('Rate must be positive');
    if (!Array.isArray(cashFlows) || cashFlows.length === 0) {
      throw new Error('Cash flows must be a non-empty array');
    }
    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate / 100, i + 1);
    }
    return npv;
  }

  // Profit Margin
  profitMargin(revenue, cost) {
    if (revenue === 0) return 0;
    return ((revenue - cost) / revenue) * 100;
  }

  // Break-even point
  breakEven(fixedCosts, pricePerUnit, variableCostPerUnit) {
    const contribution = pricePerUnit - variableCostPerUnit;
    if (contribution <= 0) return Infinity;
    return fixedCosts / contribution;
  }
}

export default Financial;
