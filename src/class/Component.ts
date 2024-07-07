import { Props, State } from "../types/Components.ts";

import capitalize from "../utils/capitalize.ts";
import getDefaultValue from "../utils/getDefaultValue.ts";
import isOwnProperty from "../utils/isOwnProperty.ts";

class Component {
  #name: string;
  #propsCode: string;
  #typesCode: string;
  #stateCode: string[];
  #importCode: {
    [key: string]: Set<string> | { component: string; isLazy: boolean };
  };
  #returnCode: string[];
  #lazyLoad: boolean;

  constructor(name: string) {
    this.#name = name;
    this.#propsCode = "";
    this.#typesCode = "";
    this.#stateCode = [];
    this.#importCode = {};
    this.#returnCode = [];
    this.#lazyLoad = false;
  }

  setLazyTrue() {
    this.#lazyLoad = true;
  }

  getName() {
    return this.#name;
  }

  setPropsCode(props: Props) {
    const propList: string[] = [];
    const typeList: string[] = [];

    for (const propName in props) {
      if (isOwnProperty(props, propName)) {
        const propType = props[propName];

        propList.push(`${propName} = ${getDefaultValue(propType)}`);

        if (propType === "array") {
          typeList.push(`${propName}: any[];`);
        } else {
          typeList.push(`${propName}: ${propType};`);
        }
      }
    }

    this.#propsCode = propList.join(", ");
    this.#typesCode = typeList.join(" ");
  }

  getPropsCode() {
    return this.#propsCode;
  }

  getTypesCode() {
    return this.#typesCode;
  }

  setStateCode(state: State) {
    for (const stateName in state) {
      if (isOwnProperty(state, stateName)) {
        const defaultValue = getDefaultValue(state[stateName]);
        const declarationCode = `const [${stateName}, set${capitalize(stateName)}] = useState(${defaultValue});`;

        this.#stateCode.push(declarationCode);
      }
    }
  }

  getStateCode() {
    return this.#stateCode;
  }

  setImportCode(isLazy: boolean, child: string) {
    switch (child) {
      case "useState": {
        if (!this.#importCode.react) {
          this.#importCode.react = new Set<string>();
        }

        const reactImportSet = this.#importCode.react;

        if (!(reactImportSet instanceof Set)) {
          return;
        }

        reactImportSet.add("useState");

        return;
      }

      case "lazy": {
        if (!this.#importCode.react) {
          this.#importCode.react = new Set<string>();
        }

        const reactImportSet = this.#importCode.react;

        if (!(reactImportSet instanceof Set)) {
          return;
        }

        reactImportSet.add("lazy");

        return;
      }

      case "Suspense": {
        if (!this.#importCode.react) {
          this.#importCode.react = new Set<string>();
        }

        const reactImportSet = this.#importCode.react;

        if (!(reactImportSet instanceof Set)) {
          return;
        }

        reactImportSet.add("Suspense");

        return;
      }

      default:
        this.#importCode[`./${child}.tsx`] = {
          component: `${child}`,
          isLazy,
        };

        return;
    }
  }

  getImportCode() {
    return this.#importCode;
  }

  setReturnCode(isLazy: boolean, child: string) {
    if (isLazy) {
      this.#returnCode.push("<Suspense fallback={<div>Loading...</div>}>");
      this.#returnCode.push(`<${child} />`);
      this.#returnCode.push("</Suspense>");
    } else {
      this.#returnCode.push(`<${child} />`);
    }
  }

  getReturnCode() {
    return this.#returnCode;
  }
}

export default Component;
