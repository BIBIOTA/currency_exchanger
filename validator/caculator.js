import { chain } from 'mathjs'

export const currencyCaculator = (amount, buyRate, sellRate) => {
  const caculateAmount = chain(amount).multiply(buyRate, sellRate);
  return Math.round((caculateAmount + Number.EPSILON) * 100) / 100;
}
