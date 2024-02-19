import AuthButton from "@/components/global/AuthButton";
import ModeToggle from "@/components/global/ModeToggle";
import { auth } from "@/lib/authOptions";

const Home = async () => {
  const session = await auth();

  return (
    <main>
      <h1 className="capitalize">Welcome, {session?.user?.name || "Guest"}!</h1>
      <AuthButton type={!session ? "login" : "logout"} />
      <ModeToggle />
    </main>
  );
};

export default Home;
