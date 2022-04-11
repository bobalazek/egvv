export function convertToDashCase(value: string) {
  return value.toLowerCase().replace(/ /g, '-');
}
