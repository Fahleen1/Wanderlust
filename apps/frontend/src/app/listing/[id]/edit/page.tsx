import EditListing from '../../components/EditListing';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <EditListing id={id} />
    </>
  );
}
