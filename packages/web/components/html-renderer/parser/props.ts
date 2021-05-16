import { Attribute } from "himalaya";

import { ParserProps } from "../types";
import htmlAttributes from "./attributes/html-attributes.json";
import svgAttributes from "./attributes/svg-attributes.json";

const attributesMap = [...htmlAttributes, ...svgAttributes].reduce<Record<string, string>>(
  (map, attribute) => {
    map[attribute.toUpperCase()] = attribute;
    return map;
  },
  {},
);

function camelCase(str: string): string {
  return str.replace(/-(\w|$)/g, (m, g: string) => g.toUpperCase());
}

function mapStyles(style: string | undefined): Record<string, string> {
  if (!style) {
    return {};
  }

  const declarations = style.split(";");
  return declarations.reduce<Record<string, string>>((stylesMap, style) => {
    const [key, value] = style.split(":").map(part => part.trim());
    if (key == null || value == null) {
      return stylesMap;
    }

    if (key.startsWith("--")) {
      stylesMap[key] = value;
    } else {
      stylesMap[camelCase(key)] = value;
    }

    return stylesMap;
  }, {});
}

export function mapProps(attributes: Attribute[]) {
  return attributes.reduce<ParserProps>((props, { key, value }) => {
    if (key === "class") {
      props.className = value;
    } else if (key === "for") {
      props.htmlFor = value;
    } else if (key.startsWith("data-")) {
      props[key] = value;
    } else if (key === "style") {
      props[key] = mapStyles(value);
    } else if (!key.startsWith("on") && key !== "className") {
      const attributeKey = key.replace(/[-:]/, "").toUpperCase();
      const camelCaseName = attributesMap[attributeKey];
      props[camelCaseName ?? key] = value == null ? true : value;
    }

    return props;
  }, {});
}
