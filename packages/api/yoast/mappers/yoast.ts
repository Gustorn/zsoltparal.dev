import { makeMapper } from "wordpress/html-renderer/mappers/mapper";

export const processHead = makeMapper(function processHead(node, root) {
  if (node !== root[0]) {
    return node;
  }

  return node;
});
