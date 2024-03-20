import PostRoute from "@/components/PostRoute";

type Props = { params: { id: string } };

export default async function DetailPage({ params: { id } }: Props) {
  return <PostRoute id={id} />;
}
