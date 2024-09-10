import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/global/MaxWidthWrapper";

type Props = {};

const SessionPage = async (props: Props) => {
  const session = await auth();

  console.log({ session });

  return (
    <div className="min-h-screen pt-28">
      <MaxWidthWrapper maxWidth="xl">
        <h1 className="text-2xl">
          <pre>{JSON.stringify(session, undefined, 2)}</pre>
        </h1>
      </MaxWidthWrapper>
    </div>
  );
};

export default SessionPage;
