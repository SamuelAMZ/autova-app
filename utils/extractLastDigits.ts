export function extractLastDigits(number: number) {
  // Convert the number to a string to easily access its digits
  const numberStr = number.toString();
  const length = numberStr.length;

  // Determine the number of digits to extract based on the length
  if (length > 2) {
    return parseInt(numberStr.slice(-2));
  } else if (length > 1) {
    return parseInt(numberStr.slice(-1));
  } else {
    return number;
  }
}