type VNode = VElement | string;

type VElement = {
  type: keyof HTMLElementTagNameMap;
  props: {[attr: string]: string};
  children: VNode[];
};

type Builder = (
  type: keyof HTMLElementTagNameMap,
  props?: {[attr: string]: string},
  children?: VNode[]
) => VElement;

const bob: Builder = (type, props = {}, children = []) => {
  const node = Object.create(null);
  Object.assign(node, {type, props, children});
  return node;
};

const render = (node: VNode) => {
  if (typeof node === 'string') return document.createTextNode(node);
  else {
    const element = document.createElement(node.type);
    for (const [k, v] of Object.entries(node.props)) element.setAttribute(k, v);
    for (const child of node.children) element.appendChild(render(child));
    return element;
  }
};

const mount = (element: Node, target: HTMLElement) => {
  target.replaceWith(element);
  return element;
};

export {bob, mount, render};
