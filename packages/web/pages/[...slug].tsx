import { filterMap } from "@zsparal/core/collections/arrays";
import { assertUnreachable } from "@zsparal/core/types/type-assertions";
import { createAst } from "@zsparal/wordpress/html-renderer/server";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { CategoryProps, WordpressCategory } from "~/components/wordpress/category";
import { WordpressFallback } from "~/components/wordpress/fallback";
import { PostProps, WordpressPost } from "~/components/wordpress/post";
import { wordpress } from "~/core/api";

type TaggedContent<T extends string, TProps> = TProps & { readonly type: T };

export type WordpressPageProps =
  | TaggedContent<"post", PostProps>
  | TaggedContent<"category", CategoryProps>
  | { type: "404" };

export default function WordpressPage(props: WordpressPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <WordpressFallback />;
  }

  switch (props.type) {
    case "post":
      return <WordpressPost {...props} />;
    case "category":
      return <WordpressCategory {...props} />;
    case "404":
      return null;
    default:
      assertUnreachable(props, "Unexpected Wordpress content type found");
  }
}

export const getStaticProps: GetStaticProps<WordpressPageProps> = async ({ params }) => {
  const postQuery = await wordpress.getPostBySlug({ slug: (params?.slug as string[]).join("/") });
  let props: WordpressPageProps = { type: "404" };
  if (postQuery?.post) {
    props = { type: "post", postContent: createAst(postQuery.post.content) };
  }

  return {
    props,
    notFound: props.type === "404",
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await wordpress.listLatestPosts();
  return {
    fallback: true,
    paths:
      filterMap(posts?.posts?.nodes, post => {
        const slug = post?.slug;
        return slug && { params: { slug: slug.split("/") } };
      }) ?? [],
  };
};
