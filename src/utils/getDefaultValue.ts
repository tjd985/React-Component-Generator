function getDefaultValue(type: string) {
  switch (type) {
    case "object":
      return "{}";

    case "boolean":
      return "false";

    case "array":
      return "[]";

    case "number":
      return "0";

    case "string":
      return "";

    default:
      return "null";
  }
}

export default getDefaultValue;
