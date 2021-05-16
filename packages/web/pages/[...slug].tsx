import { assertUnreachable } from "@zsparal/core/types/type-assertions";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { CategoryProps, CmsCategory } from "~/components/cms/category";
import { CmsFallback } from "~/components/cms/fallback";
import { CmsPost, PostProps } from "~/components/cms/post";

type TaggedContent<T extends string, TProps> = TProps & { readonly type: T };

export type CmsPageProps =
  | TaggedContent<"post", PostProps>
  | TaggedContent<"category", CategoryProps>
  | { type: "404" };

export default function CmsPage(props: CmsPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <CmsFallback />;
  }

  switch (props.type) {
    case "post":
      return <CmsPost {...props} />;
    case "category":
      return <CmsCategory {...props} />;
    case "404":
      return null;
    default:
      assertUnreachable(props, "Unexpected CMS content type found");
  }
}

export const getStaticProps: GetStaticProps<CmsPageProps> = () => {
  const props: CmsPageProps = { type: "404" };

  return Promise.resolve({
    props,
    notFound: props.type === "404",
  });
};

export const getStaticPaths: GetStaticPaths = () => {
  return Promise.resolve({
    fallback: true,
    paths: [],
  });
};
