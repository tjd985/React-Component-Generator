import { Components } from "./Components.ts";

interface Events {
  [key: string]: { payload: string };
}

interface HookStructure {
  args: string;
  returns: { [key: string]: string };
}

interface Hooks {
  [key: string]: HookStructure;
}

interface Styles {
  [key: string]: { css: string };
}

interface YamlStructure {
  components: Components;
  events: Events;
  hooks: Hooks;
  styles: Styles;
}

export default YamlStructure;
