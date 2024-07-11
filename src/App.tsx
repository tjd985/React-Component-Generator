import { useEffect, useState } from "react";

import parseYamlToJson from "./services/yamlToJson.ts";
import doTopologicalSort from "./services/doTopologicalSort.ts";
import generateComponentStructure from "./services/generateComponentStructure.ts";
import generateCodeStack from "./services/generateCodeStack.ts";
import downloadTsxFile from "./services/downloadFile.ts";
import convertToToken from "./services/convertToToken.ts";
import generateCode from "./services/generateCode.ts";

import isOwnProperty from "./utils/isOwnProperty.ts";
import parse from "./services/parse.ts";

function App() {
  const [yamlText, setYamlText] = useState(null);

  useEffect(() => {
    async function getSorting() {
      if (!yamlText) {
        return;
      }

      const reactComponent: { [key: string]: string } = {};
      const tokens = convertToToken(yamlText);

      parse(yamlText);

      const jsonData = await parseYamlToJson(yamlText);
      const sortingResult = doTopologicalSort(jsonData.components);

      for (const componentName in jsonData.components) {
        if (isOwnProperty(jsonData.components, componentName)) {
          const currentComponent = jsonData.components[componentName];
          const componentInstance = generateComponentStructure(
            currentComponent,
            componentName,
            jsonData.components,
          );

          const codeStack = generateCodeStack(componentInstance);
          const componentCode = generateCode(codeStack);

          reactComponent[componentName] = componentCode;
        }
      }

      for (const componentName in reactComponent) {
        if (isOwnProperty(reactComponent, componentName)) {
          const componentCode = reactComponent[componentName];

          downloadTsxFile(componentName, componentCode);
        }
      }
    }

    getSorting();

    return;
  }, [yamlText]);

  function handleChange(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file, "utf-8");
    reader.onload = data => {
      setYamlText(data.currentTarget.result);
    };
  }

  return (
    <>
      <div>select .yaml file</div>
      <input onChange={handleChange} type="file" accept=".yaml" />
    </>
  );
}

export default App;
