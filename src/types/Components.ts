interface Props {
  [key: string]: string;
}

interface State {
  [key: string]: string;
}

interface Subscription {
  event: string;
  action: string;
}

interface ComponentProperty {
  props?: Props;
  state?: State;
  lazyLoad?: boolean;
  children?: string[];
  publications?: string[];
  subscriptions?: Subscription[];
}

interface Components {
  [key: string]: ComponentProperty;
}

export default Components;
