/**
 * @function lessThanOneOrNaN
 */
export function lessThanOneNaN<T = any>(value: T) {
  const parseInputToNumber = Number(value);

  const isInvalid = parseInputToNumber < 1 || isNaN(parseInputToNumber);

  return { isInvalid, parsedValue: parseInputToNumber };
}

export const lessThan = (value: any) => value < 1 || isNaN(value);
