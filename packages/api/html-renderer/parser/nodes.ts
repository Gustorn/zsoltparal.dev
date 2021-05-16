import { filterMap } from "@zsparal/core/collections/arrays";
import { assertUnreachable } from "@zsparal/core/types/type-assertions";
import { Comment, Element, Node, Text } from "himalaya";
import { decode } from "html-entities";

import { ParserComment, ParserElement, ParserNode, ParserText } from "../types";
import { mapProps } from "./props";

function mapElement(node: Element): ParserElement {
  const result: ParserElement = {
    type: "element",
    component: node.tagName as keyof JSX.IntrinsicElements,
    props: mapProps(node.attributes),
    children: null,
    meta: {},
  };

  result.children = filterMap(node.children, adaptNode);

  return result;
}

function mapTextLike(
  node: Text | Comment,
  type: "text" | "comment",
): ParserText | ParserComment | null {
  const content = decode(node.content);
  if (content.trim().length) {
    return { type, content };
  }

  return null;
}

export function adaptNode(node: Node): ParserNode | null {
  switch (node.type) {
    case "element":
      return mapElement(node);
    case "text":
    case "comment":
      return mapTextLike(node, node.type);
    default:
      return assertUnreachable(node, "Unexpected node type found during HTML parsing");
  }
}
