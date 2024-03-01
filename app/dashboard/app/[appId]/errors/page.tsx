type Props = { params: { appId: string } };

const ErrorsPage = async ({ params }: Props) => {
  return (
    <div>
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-muted-foreground font-semibold">
            Errors Dashboard
          </h1>
        </div>
        <div>Date range selector</div>
      </section>
    </div>
  );
};

export default ErrorsPage;
