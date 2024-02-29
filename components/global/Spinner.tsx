type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="">
      <div className="p-[3px] bg-gradient-to-tr animate-spin flex-items-center justify-center from-purple-500 to-pink-500 rounded-full">
        <div className="bg-secondary/75 rounded-full">
          <div className="w-4 h-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
