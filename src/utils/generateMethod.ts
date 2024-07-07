import { CodeStack } from "../types/CodeStack.ts";

import isOwnProperty from "./isOwnProperty.ts";

function generateImportCode(
  codeStack: CodeStack,
  codeParts: {
    [key: string]: Set<string> | { component: string; isLazy: boolean };
  },
) {
  for (const from in codeParts) {
    if (isOwnProperty(codeParts, from)) {
      const value = codeParts[from];

      if (from === "react") {
        const methods = Array.from(value).join(", ");

        codeStack.push({
          code: `import { ${methods} } from "react";`,
          type: "DECLARE",
        });
        codeStack.push({ code: "\n", type: "ENTER" });
      } else {
        if (value.isLazy) {
          codeStack.push({
            code: `const ${value.component} = lazy(() => import("./${from}"));`,
            type: "DECLARE",
          });
          codeStack.push({ code: "\n", type: "ENTER" });

          continue;
        }
        codeStack.push({
          code: `import ${value.component} from "${from}";`,
          type: "DECLARE",
        });
        codeStack.push({ code: "\n", type: "ENTER" });
      }
    }
  }

  return codeStack;
}

function generateFunctionDeclare(
  codeStack: CodeStack,
  propsCode: string,
  typesCode: string,
  componentName: string,
) {
  codeStack.push({
    code: `export default function ${componentName}({ ${propsCode} }: { ${typesCode} }) {`,
    type: "OPEN",
  });
  codeStack.push({ code: "\n", type: "ENTER" });
}

function generateStateCode(codeStack: CodeStack, stateCodeList: string[]) {
  stateCodeList.forEach((stateCode: string) => {
    codeStack.push({ code: stateCode, type: "DECLARE" });
    codeStack.push({ code: "\n", type: "ENTER" });
  });
}

function generateReturnCode(codeStack: CodeStack, returnCodeList: string[]) {
  returnCodeList.forEach((part: string) => {
    const currentCode = {
      code: part,
      type: "CLOSE",
    };

    if (part[1] === "/") {
      currentCode.type = "CLOSE";
    } else if (part[part.length - 2] === "/") {
      currentCode.type = "CALL";
    } else {
      currentCode.type = "OPEN";
    }

    codeStack.push(currentCode);
    codeStack.push({ code: "\n", type: "ENTER" });
  });
}

export {
  generateImportCode,
  generateFunctionDeclare,
  generateStateCode,
  generateReturnCode,
};
