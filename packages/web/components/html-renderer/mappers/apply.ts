import { ParserElement, ParserNode } from "../types";
import { Mapper } from "./mapper";

export function applyMappers(element: ParserElement, root: ParserNode[], mappers: Array<Mapper>) {
  return mappers.reduce<ParserElement | null>(
    (result, mapper) => result && mapper(result, root),
    element,
  );
}
