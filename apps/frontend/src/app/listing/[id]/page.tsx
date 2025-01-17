import Listing from '../Listing';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <>
      <Listing id={id} />
    </>
  );
}
