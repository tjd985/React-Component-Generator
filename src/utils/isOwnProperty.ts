export default function isOwnProperty(object: object, targetProperty: string) {
  if (Object.prototype.hasOwnProperty.call(object, targetProperty)) {
    return true;
  }

  return false;
}
