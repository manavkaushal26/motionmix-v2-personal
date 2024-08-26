const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

const config = {
  name: "MotionMix",
  company: {
    name: "Joyverse Innovation Labs Inc.",
  },
  authUrl: isProduction
    ? "https://auth.joyverse.club"
    : "http://localhost:3001",
  apiBaseUrl: isProduction
    ? "https://api.motionmix.ai"
    : "https://api.motionmix.ai",
  staticFileUrl: "https://static.motionmix.ai",
  documentationUrl: "https://docs.motionmix.ai/",
};

const imageKit = {
  baseDeliveryUrl: {
    image: isProduction
      ? "https://ik.imagekit.io/motionmix"
      : "https://ik.imagekit.io/motionmix",
    otherFiles: isProduction
      ? "https://file.motionmix.club"
      : "https://file.motionmix.club",
  },
  baseDeliveryUrlMotionmix: {
    image: isProduction
      ? "https://ik.imagekit.io/motionmix"
      : "https://ik.imagekit.io/motionmix",
    other: isProduction
      ? "https://file.motionmix.club"
      : "https://file.motionmix.club",
  },
};

const GLOBAL_TRANSITION_DURATION = 0.5;

const defaultSEO = {
  title: `Visual Analytics Platform for VR/MR and 3D Apps`,
  titleTemplate: config.name + " | %s",
  description:
    "Explore the power of MotionMix, a cutting-edge Visual Analytics Platform designed for VR/MR and 3D Apps. Gain deeper insights and understanding from your data through immersive virtual and mixed reality environments.",
  keywords:
    "3D Space, Virtual Reality, Design, VR home, simulation, 3D environment, Metaverse Spaces, 3D Design, 3D design library, 3D Home Interior, 3D Home Design, escape rooms, NFT galleries, 3D hangout zone, oculus, design spaces, creators tool, room design, NFT Tokens, Virtual Reality Worlds",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://motionmix.ai",
    site_name: config.name,
  },
};

export {
  GLOBAL_TRANSITION_DURATION,
  config,
  defaultSEO,
  imageKit,
  isProduction,
};
