type Props = {};

const ComingSoon = (props: Props) => {
  return (
    <div className="w-full h-[calc(100vh-64px)] flex text-center flex-col items-center justify-center">
      <p className="text-6xl">Coming Soon</p>
      <p className="text-muted-foreground max-w-[768px] mt-4">
        Our team is actively working on enhancing the current feature. We
        anticipate its availability in the near future. Stay connected for
        updates, and thank you for your patience.
      </p>
    </div>
  );
};

export default ComingSoon;
