/**
 * Formats a resource number to 2 decimal places.
 *
 * @param value The number to format
 * @returns A string representation of the number with 2 decimal places
 */
export const formatResource = (value: number): string => {
  return value.toFixed(2);
};
