import { filterMap } from "@zsparal/core/collections/arrays";

import { applyMappers } from "./mappers/apply";
import { replaceWithNextImage } from "./mappers/client/next-image";
import { replaceWithNextLink } from "./mappers/client/next-link";
import { ParserNode } from "./types";

const clientMappers = [replaceWithNextImage, replaceWithNextLink];

function handleNode(node: ParserNode, root: ParserNode[], index: number) {
  if (node.type === "comment") {
    return null;
  }

  if (node.type === "text") {
    return node.content;
  }

  if (!applyMappers(node, root, clientMappers)) {
    return null;
  }

  return (
    <node.component key={index} {...node.props}>
      {node.children ? handleNodes(node.children) : null}
    </node.component>
  );
}

function handleNodes(nodes: ParserNode[]) {
  const result = filterMap(nodes, (node, index) => handleNode(node, nodes, index));

  if (result.length > 1) {
    return result;
  }

  if (result.length === 1) {
    return result[0];
  }

  return null;
}

export function HtmlToReact({ html }: { html: ParserNode[] | null }) {
  if (!html) {
    return null;
  }

  return handleNodes(html) as React.ReactElement;
}
