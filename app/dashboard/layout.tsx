import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/authOptions";
import { SingleApp } from "@/lib/types";
import { Bell, Menu } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const fetchAllApps = async (token: string) => {
  try {
    const res = await fetch("https://api.motionmix.ai/v1/app", {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();

    if (res.ok) {
      return data.apps;
    }
  } catch (error) {
    console.log(error);
  }
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session) {
    return redirect("/signin?callbackUrl=/dashboard");
  }

  const appsList: SingleApp[] = await fetchAllApps(session?.user?.token);

  return (
    <>
      <div>
        {/* MOBILE SIDEBAR */}

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <DashboardSidebar appsList={appsList} />
        </div>

        <div className="lg:pl-72">
          <div className="bg-[#161616] px-4 sm:px-6 lg:px-8 sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b shadow-sm sm:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 lg:hidden"
              // onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="w-full" />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Button
                  size="icon"
                  type="button"
                  variant="secondary"
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                </Button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px "
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
