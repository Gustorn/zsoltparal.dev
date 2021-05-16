import { ElementType } from "react";

type Prop = boolean | string | number | undefined | Record<string, string>;

export interface ParserProps {
  [key: string]: Prop;
}

export interface ParserElement {
  type: "element";
  component: ElementType;
  props: ParserProps;
  children: ParserNode[] | null;
  meta: Record<string, string | boolean>;
}

export interface ParserText {
  type: "text";
  component?: never;
  content: string;
}

export interface ParserComment {
  type: "comment";
  component?: never;
  content: string;
}

export type ParserNode = ParserElement | ParserText | ParserComment;
