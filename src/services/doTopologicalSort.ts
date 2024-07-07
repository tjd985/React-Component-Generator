import isOwnProperty from "../utils/isOwnProperty.ts";
import { Components } from "../types/Components.ts";

function doTopologicalSort(components: Components) {
  const graph: { [key: string]: string[] } = {};
  const indegrees = new Map();
  const queue: string[] = [];
  const result: string[] = [];

  for (const componentName in components) {
    if (isOwnProperty(components, componentName)) {
      indegrees.set(componentName, 0);
      graph[componentName] = [];
    }
  }

  for (const componentName in components) {
    if (isOwnProperty(components, componentName)) {
      const currentComponent = components[componentName];
      const childrenComponents = currentComponent.children;

      if (!childrenComponents) {
        continue;
      }

      childrenComponents.forEach((component: string) => {
        indegrees.set(component, indegrees.get(component) + 1);
        graph[componentName].push(component);
      });
    }
  }

  for (const [componentName, indegree] of indegrees) {
    if (indegree === 0) {
      queue.push(componentName);
    }
  }

  while (queue.length) {
    const currentComponent = queue.shift();

    if (!currentComponent) {
      continue;
    }

    result.push(currentComponent);

    for (const childComponent of graph[currentComponent]) {
      indegrees.set(childComponent, indegrees.get(childComponent) - 1);

      if (!indegrees.get(childComponent)) {
        queue.push(childComponent);
      }
    }
  }

  return result;
}

export default doTopologicalSort;
