/**
 * Financial calculations
 */

export class Financial {
  // Simple Interest
  simpleInterest(principal, rate, time) {
    return principal * (1 + (rate / 100) * time);
  }

  // Compound Interest
  compoundInterest(principal, rate, time, frequency = 12) {
    return principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  }

  // Loan EMI
  emi(principal, annualRate, years) {
    const monthlyRate = annualRate / (12 * 100);
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
  }

  // Future Value
  futureValue(principal, rate, time, compoundingFrequency = 12) {
    return principal * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
  }

  // Present Value
  presentValue(futureValue, rate, time, compoundingFrequency = 12) {
    return futureValue / Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
  }

  // ROI (Return on Investment)
  roi(initialInvestment, finalValue) {
    if (initialInvestment === 0) return 0;
    return ((finalValue - initialInvestment) / initialInvestment) * 100;
  }

  // CAGR (Compound Annual Growth Rate)
  cagr(initialValue, finalValue, years) {
    if (initialValue === 0 || years === 0) return 0;
    return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  }

  // Discounted Cash Flow (simple)
  npv(rate, cashFlows) {
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
