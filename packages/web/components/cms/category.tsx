export interface CategoryProps {
  name: string;
}

export function CmsCategory({ name }: CategoryProps) {
  return <div>{name}</div>;
}
