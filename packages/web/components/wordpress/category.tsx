export interface CategoryProps {
  name: string;
}

export function WordpressCategory({ name }: CategoryProps) {
  return <div>{name}</div>;
}
