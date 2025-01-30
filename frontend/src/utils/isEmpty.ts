export default function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}
