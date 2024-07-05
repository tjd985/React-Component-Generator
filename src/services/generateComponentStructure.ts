import { ComponentProperty } from "../types/Components.ts";

import Component from "../class/Component.ts";

function generateComponentStructure(
  componenet: ComponentProperty,
  componentName: string,
) {
  const currentComponent: Component = new Component(componentName);

  if (componenet.props) {
    currentComponent.setPropsCode(componenet.props);
  }

  if (componenet.state) {
    currentComponent.setStateCode(componenet.state);
  }

  if (componenet.children) {
    currentComponent.setImportCode(componenet.children);
    currentComponent.setReturnCode(componenet.children);
  }

  return currentComponent;
}

export default generateComponentStructure;
