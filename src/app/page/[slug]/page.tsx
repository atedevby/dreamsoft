type PageParams = {
  slug: string;
};

export default async function StaticContentPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  return (
    <div className="stack">
      <h1>{slug}</h1>
      <p className="muted">
        Здесь будет контент из таблицы <code>Page</code> после подключения CRUD в
        админке.
      </p>
    </div>
  );
}
