import Component from "../class/Component.ts";

import {
  generateImportCode,
  generateFunctionDeclare,
  generateStateCode,
  generateReturnCode,
} from "../utils/generateMethod.ts";

import CodeStack from "../types/CodeStack.ts";

function generateCodeStack(componentInstance: Component) {
  const codeStack: CodeStack = [];

  const componentName = componentInstance.getName();
  const importCodeList = componentInstance.getImportCode();
  const propsCode = componentInstance.getPropsCode();
  const typesCode = componentInstance.getTypesCode();
  const stateCodeList = componentInstance.getStateCode();
  const returnCodeList = componentInstance.getReturnCode();

  generateImportCode(codeStack, importCodeList);
  codeStack.push({ code: "\n", type: "ENTER" });

  generateFunctionDeclare(codeStack, propsCode, typesCode, componentName);
  generateStateCode(codeStack, stateCodeList);
  codeStack.push({ code: "\n", type: "ENTER" });

  codeStack.push({ code: "return ", type: "RETURN" });
  codeStack.push({ code: "<>", type: "OPEN" });
  codeStack.push({ code: "\n", type: "ENTER" });

  generateReturnCode(codeStack, returnCodeList);
  codeStack.push({ code: "</>;", type: "CLOSE" });
  codeStack.push({ code: "\n", type: "ENTER" });

  codeStack.push({ code: "}", type: "CLOSE" });

  return codeStack;
}

export default generateCodeStack;
