import { PlainElementNode, AttributeNode } from "@vue/compiler-core";
import { stripAttribute } from "./sfc";
import { NodeTypes, ElementTypes } from "./types";

const getDummyLoc = () => ({
  start: { offset: 0, line: 0, column: 0 },
  end: { offset: 0, line: 0, column: 0 },
  source: "test",
});

const getNode = (
  props: AttributeNode[],
  tagType: (typeof ElementTypes)[keyof typeof ElementTypes],
  type: (typeof NodeTypes)[keyof typeof NodeTypes]
): PlainElementNode => ({
  tagType: tagType as number,
  codegenNode: undefined,
  type: type as number,
  ns: 0,
  tag: "div",
  isSelfClosing: true,
  props,
  children: [],
  loc: getDummyLoc(),
});

const getProp = (name: string): AttributeNode => ({
  type: NodeTypes.ATTRIBUTE,
  name,
  value: undefined,
  loc: getDummyLoc(),
});

describe("SFC compiler extensions tests", () => {
  it("Should remove the specified attribute", () => {
    const expectedAttributeName = "data-testid";
    const node = getNode(
      [getProp(expectedAttributeName)],
      ElementTypes.ELEMENT,
      NodeTypes.ELEMENT
    );

    stripAttribute(node, expectedAttributeName);

    expect(node.props.length).toBe(0);
  });

  it("Should ignore non-element types", () => {
    const expectedAttributeName = "data-testid";
    const node = getNode(
      [getProp(expectedAttributeName)],
      ElementTypes.COMPONENT,
      NodeTypes.ROOT
    );

    stripAttribute(node, expectedAttributeName);

    expect(node.props.length).toBe(1);
  });
});
