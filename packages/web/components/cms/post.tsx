import { HtmlToReact } from "../html-renderer/client";
import { ParserNode } from "../html-renderer/types";

export interface PostProps {
  postContent: ParserNode[] | null;
}

export function CmsPost({ postContent }: PostProps) {
  return (
    <div className="prose">
      <HtmlToReact html={postContent} />
    </div>
  );
}
