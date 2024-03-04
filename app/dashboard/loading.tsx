import Spinner from "@/components/global/Spinner";

type Props = {};

const loading = ({}: Props) => {
  return (
    <section className="w-full flex items-center justify-center h-[calc(100vh-64px)]">
      <Spinner />
    </section>
  );
};

export default loading;
