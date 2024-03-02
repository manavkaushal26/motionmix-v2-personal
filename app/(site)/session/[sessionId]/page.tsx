import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";

type Props = {};

const SessionPage = (props: Props) => {
  return (
    <div className="min-h-screen pt-28">
      <MaxWidthWrapper maxWidth="xl">
        <h1 className="text-2xl">Session</h1>
      </MaxWidthWrapper>
    </div>
  );
};

export default SessionPage;
