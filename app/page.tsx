import AuthButton from "@/components/global/AuthButton";
import { auth } from "@/lib/authOptions";

const Home = async () => {
  const session = await auth();

  if (!session)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome, Guest</h1>
        <AuthButton type="login" />
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome, {session?.user?.name}</h1>
      <AuthButton type="logout" />
    </main>
  );
};

export default Home;
