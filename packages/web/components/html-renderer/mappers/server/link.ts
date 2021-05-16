import { makeMapper } from "../mapper";

export const convertLink = makeMapper(function convertLink(node) {
  if (node.component !== "a") {
    return node;
  }

  const href = node.props.href;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
  if (typeof href !== "string" || !cmsUrl || !href.startsWith(cmsUrl)) {
    return node;
  }

  const relativeHref = href.replace(cmsUrl, "");
  node.props.href = relativeHref ? relativeHref : "/";
  node.meta.nextLink = true;

  return node;
});
