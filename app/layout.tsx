import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { defaultSEO } from "@/lib/globalConfig";
import GlobalProvider from "@/lib/providers/GlobalProvider";
import ModalProvider from "@/lib/providers/ModalProvider";
import SessionProvider from "@/lib/providers/session-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MotionMix | " + defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>
              <GlobalProvider>
                <main>{children}</main>
                <Toaster />
              </GlobalProvider>
            </ModalProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
