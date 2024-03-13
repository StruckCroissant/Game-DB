import { NodeTypes } from "./types";
import type { TemplateChildNode } from "@vue/compiler-core";

export function stripAttribute(node: TemplateChildNode, attributeName: string) {
  if (node.type !== NodeTypes.ELEMENT) return;

  for (let i = 0; i < node.props.length; i++) {
    const prop = node.props[i];
    if (
      !prop ||
      prop.type !== NodeTypes.ATTRIBUTE ||
      prop.name !== attributeName
    )
      continue;
    node.props.splice(i, 1);
    i--;
  }
}
