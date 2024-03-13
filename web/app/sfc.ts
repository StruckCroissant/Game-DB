import { NodeTypes } from "@/types";
import type { RootNode, TemplateChildNode } from "@vue/compiler-core";

export function stripAttribute(
  node: RootNode | TemplateChildNode,
  attributeName: string
) {
  console.log("here");
  if (node.type !== NodeTypes.ELEMENT) return;
  if (!("props" in node)) return;

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
