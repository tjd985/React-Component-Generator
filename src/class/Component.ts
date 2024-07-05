import { Props, State } from "../types/Components.ts";

import capitalize from "../utils/capitalize.ts";
import getDefaultValue from "../utils/getDefaultValue.ts";
import isOwnProperty from "../utils/isOwnProperty.ts";

class Component {
  name: string;
  propsCode: string;
  stateCode: string[];
  importCode: string[];
  returnCode: string[];

  constructor(name: string) {
    this.name = name;
    this.propsCode = "";
    this.stateCode = [];
    this.importCode = [];
    this.returnCode = [];
  }

  setPropsCode(props: Props) {
    this.propsCode = Object.keys(props).join(", ");
  }

  getPropsCode() {
    return this.propsCode;
  }

  setStateCode(state: State) {
    for (const stateName in state) {
      if (isOwnProperty(state, stateName)) {
        const defaultValue = getDefaultValue(state[stateName]);
        const declarationCode = `const [${stateName}, set${capitalize(stateName)}] = useState(${defaultValue})`;

        this.stateCode.push(declarationCode);
      }
    }
  }

  getStateCode() {
    return this.stateCode;
  }

  setImportCode(children: string[]) {
    this.importCode = children.map(
      child => `import ${child} from "./${child}";`,
    );
  }

  getImportCode() {
    return this.importCode;
  }

  setReturnCode(children: string[]) {
    this.returnCode = children.map(child => `<${child} />`);
  }

  getReturnCode() {
    return this.returnCode;
  }
}

export default Component;
