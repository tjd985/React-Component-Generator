import { ComponentProperty, Components } from "../types/Components.ts";

import Component from "../class/Component.ts";

function generateComponentStructure(
  component: ComponentProperty,
  componentName: string,
  componentMap: Components,
) {
  const currentComponent: Component = new Component(componentName);

  if (component.props) {
    currentComponent.setPropsCode(component.props);
  }

  if (component.state) {
    currentComponent.setStateCode(component.state);
    currentComponent.setImportCode(false, "useState");
  }

  if (component.lazyLoad) {
    currentComponent.setLazyTrue();
  }

  if (component.children) {
    for (const child of component.children) {
      const hasLazy = !!componentMap[child].lazyLoad;

      currentComponent.setImportCode(hasLazy, child);

      if (hasLazy) {
        currentComponent.setImportCode(false, "lazy");
        currentComponent.setImportCode(false, "Suspense");
      }

      currentComponent.setReturnCode(hasLazy, child);
    }
  }

  return currentComponent;
}

export default generateComponentStructure;
