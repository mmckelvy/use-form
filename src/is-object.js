export default function isObject(item) {
  return (
    typeof item === 'object'
    && item !== null
    && !(item instanceof RegExp)
    && !(item instanceof Error)
    && !(item instanceof Date)
    && !Array.isArray(item)
  );
}