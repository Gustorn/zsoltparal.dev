import Link from "next/link";

import { makeMapper } from "../mapper";

function NextLink({ href, ...rest }: { href: string }) {
  return (
    <Link href={href}>
      <a {...rest} />
    </Link>
  );
}

export const replaceWithNextLink = makeMapper(function replaceWithNextLink(node) {
  if (node.meta.nextLink) {
    node.component = NextLink;
  }

  return node;
});
