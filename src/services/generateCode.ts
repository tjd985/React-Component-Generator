import { CodeStack } from "../types/CodeStack.ts";

function generateCode(codeStack: CodeStack) {
  let result = "";
  let indent = 0;

  for (const codePart of codeStack) {
    const { code, type } = codePart;

    if (type === "OPEN") {
      result += " ".repeat(indent) + code;
      indent += 2;

      continue;
    }

    if (type === "CLOSE") {
      indent -= 2;
      result += " ".repeat(indent) + code;

      continue;
    }

    result += " ".repeat(indent) + code;
  }

  return result;
}

export default generateCode;
