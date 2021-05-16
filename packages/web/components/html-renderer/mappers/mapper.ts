import { ParserElement, ParserNode } from "../types";

export interface Mapper {
  (node: ParserElement, root: ParserNode[]): ParserElement | null;
}

export function makeMapper(mapper: Mapper): Mapper {
  return mapper;
}
