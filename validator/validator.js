export const currencyValidator = (v) => {
  if (v === 'TWD' || v === 'JPY' || v === 'USD') {
    return true;
  } else {
    return false;
  }
}

export const checkIsInteger = (v) => {
  const number = parseFloat(v);

  if (isNaN(number)) {
    return false;
  }

  return Number.isInteger(number);
}

export const checkIsIntegerGreaterThanOne = (v) => {
  const number = parseInt(v, 10);

  if (isNaN(number)) {
    return false;
  }

  return number > 0;
}