import Image from "next/image";

import { makeMapper } from "../mapper";

export const replaceWithNextImage = makeMapper(function replaceWithNextImage(node) {
  if (node.meta.nextImage) {
    node.component = Image;
  }

  return node;
});
