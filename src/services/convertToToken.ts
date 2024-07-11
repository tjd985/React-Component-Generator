import getIndent from "../utils/getIndent.ts";

interface Token {
  name: string;
  indent: number;
  type: string;
}

function convertToToken(yamlString: string) {
  const lines = yamlString.split("\n");
  const tokens: Token[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indent = getIndent(line);
    let currentLine = line.trim();

    if (currentLine.startsWith("-")) {
      let index = i - 1;
      currentLine = currentLine.slice(2);
      const [key, value] = currentLine.split(":");

      while (tokens[index].indent >= indent) {
        index--;
      }

      if (tokens[index].type !== "array") {
        tokens[index].type = "array";
      }

      if (!value) {
        tokens.push({ name: key, indent, type: "array_property" });

        continue;
      } else {
        tokens.push({
          name: `${key}:${value}`,
          indent,
          type: "object_in_array",
        });

        continue;
      }
    } else {
      const [key, value] = currentLine.split(":");

      if (!value) {
        tokens.push({ name: key, indent, type: "object" });

        continue;
      } else {
        let index = i - 1;
        const beforeLength = tokens.length;

        while (indent - tokens[index].indent <= 2) {
          if (tokens[index].type === "object_in_array") {
            tokens.push({
              name: `${key}:${value}`,
              indent: indent - 2,
              type: "object_in_array",
            });

            break;
          }

          index--;
        }

        if (beforeLength === tokens.length) {
          tokens.push({ name: `${key}:${value}`, indent, type: "property" });

          continue;
        }
      }
    }
  }

  return tokens;
}

export default convertToToken;
