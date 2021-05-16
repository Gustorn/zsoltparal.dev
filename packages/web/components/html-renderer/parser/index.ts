import { filterMap } from "@zsparal/core/collections/arrays";
import { parse as parseHtml } from "himalaya";

import { ParserNode } from "../types";
import { adaptNode } from "./nodes";

export function parse(html: string): ParserNode[] {
  const nodes = parseHtml(html);
  return filterMap(nodes, adaptNode);
}
