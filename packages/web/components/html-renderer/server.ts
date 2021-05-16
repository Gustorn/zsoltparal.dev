import { filterMap } from "@zsparal/core/collections/arrays";

import { applyMappers } from "./mappers/apply";
import { Mapper } from "./mappers/mapper";
import { convertImage } from "./mappers/server/image";
import { convertLink } from "./mappers/server/link";
import { parse } from "./parser";
import { ParserNode } from "./types";

const serverMappers = [convertImage, convertLink];

function processNode(node: ParserNode, root: ParserNode[], mappers: Array<Mapper>) {
  if (node.type === "element") {
    if (node.children) {
      node.children = filterMap(node.children, child => processNode(child, root, mappers));
    }
    return applyMappers(node, root, mappers);
  }

  return node;
}

export function createAst(
  html: string | null | undefined,
  mappers = serverMappers,
): ParserNode[] | null {
  if (!html) {
    return null;
  }

  const root = parse(html);

  return filterMap(root, node => processNode(node, root, mappers));
}
