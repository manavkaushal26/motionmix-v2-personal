import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/authOptions";
import { fetchAllApps } from "@/lib/queries";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await auth();

  const appsList = await fetchAllApps(session.user.token);

  return (
    <>
      <div>
        {/* MOBILE SIDEBAR */}

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <DashboardSidebar session={session} appsList={appsList || []} />
        </div>

        <div className="lg:pl-72">
          {/* InfoBar */}
          {/* <div className="dark:bg-custom-zinc px-4 sm:px-6 lg:px-8 sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b shadow-sm sm:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 lg:hidden"
              // onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-6 w-px lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="w-full" />
              <div className="flex items-center gap-x-3">
                <Notifications />
              </div>
            </div>
          </div> */}

          <main className="py-8">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
