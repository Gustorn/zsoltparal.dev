import { HtmlToReact } from "@zsparal/wordpress/html-renderer/client";
import { ParserNode } from "@zsparal/wordpress/html-renderer/types";

export interface PostProps {
  postContent: ParserNode[] | null;
}

export function WordpressPost({ postContent }: PostProps) {
  return (
    <div className="prose">
      <HtmlToReact html={postContent} />
    </div>
  );
}
