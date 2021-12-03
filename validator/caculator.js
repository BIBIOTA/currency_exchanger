export const currencyCaculator = (amount, buyRate, sellRate) => {
  const caculateAmount = amount * buyRate * sellRate;
  return Math.round((caculateAmount + Number.EPSILON) * 100) / 100;
}