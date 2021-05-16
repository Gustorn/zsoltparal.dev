import { makeMapper } from "../mapper";

export const convertLink = makeMapper(function convertLink(node) {
  if (node.component !== "a") {
    return node;
  }

  const href = node.props.href;
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  if (typeof href !== "string" || !wpUrl || !href.startsWith(wpUrl)) {
    return node;
  }

  const relativeHref = href.replace(wpUrl, "");
  node.props.href = relativeHref ? relativeHref : "/";
  node.meta.nextLink = true;

  return node;
});
