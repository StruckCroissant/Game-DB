import { PlainElementNode, AttributeNode } from "@vue/compiler-core";
import { stripAttribute } from "./sfc";
import { NodeTypes, ElementTypes } from "@/types";

const getDummyLoc = () => ({
  start: { offset: 0, line: 0, column: 0 },
  end: { offset: 0, line: 0, column: 0 },
  source: "test",
});

const getNode = (props: AttributeNode[]): PlainElementNode => ({
  tagType: ElementTypes.ELEMENT,
  codegenNode: undefined,
  type: NodeTypes.ELEMENT,
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
    const node = getNode([getProp(expectedAttributeName)]);

    stripAttribute(node, expectedAttributeName);

    expect(node.props.length).toBe(0);
  });
});
