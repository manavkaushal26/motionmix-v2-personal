import CardSpotlight from "./CardSpotlight";

type Props = {};

const ComingSoon = (props: Props) => {
  return (
    <CardSpotlight className="w-full h-96 flex text-center flex-col items-center justify-center">
      <p className="text-6xl animate-pulse">Coming Soon</p>
      <p className="text-muted-foreground max-w-lg mt-4">
        Apologies for this, the current feature is under development and will be
        available soon! Keep in touch.
      </p>
    </CardSpotlight>
  );
};

export default ComingSoon;
