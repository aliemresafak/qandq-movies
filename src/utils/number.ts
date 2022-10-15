export const round = (number: number, precision: number = 2) => {
  const _precision = Math.pow(10, precision);
  return Math.round(number * _precision) / _precision;
};
