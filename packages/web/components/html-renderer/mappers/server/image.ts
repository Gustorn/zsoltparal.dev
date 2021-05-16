import { makeMapper } from "../mapper";

export const convertImage = makeMapper(function convertImage(node) {
  if (node.component !== "img") {
    return node;
  }

  if (node.props["data-src"]) {
    node.props.src = node.props["data-src"];
  }

  if (node.props["data-srcset"]) {
    node.props.srcSet = node.props["data-srcset"];
  }

  if (node.props.width != null && node.props.height != null) {
    // We need to convert these props to integers for Next's image component
    node.props.width = +node.props.width;
    node.props.height = +node.props.height;
  } else {
    // Fallback to layout=fill behavior if no explicit width/height is set
    node.props.layout = "fill";
  }

  node.meta.nextImage = true;

  return node;
});
