import Component from "../class/Component.ts";

function generateCode(componentStructure: Component, componentName: string) {
  const importCodeList = componentStructure.getImportCode();
  const propsCode = componentStructure.getPropsCode();
  const stateCodeList = componentStructure.getStateCode();
  const returnCodeList = componentStructure.getReturnCode();

  return `
import { useState } from "react";
${importCodeList.length ? importCodeList.join("\n") : ""}

export default function ${componentName}({ ${propsCode} }) {
  ${stateCodeList.length ? stateCodeList.join("\n  ") : ""}

  return (
    <>
      ${returnCodeList.length ? returnCodeList.join("\n      ") : ""}
    </>
  );
}
  `;
}

export default generateCode;
