import GlobalProvider from "@/components/providers/GlobalProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { defaultSEO } from "@/lib/globalConfig";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MotionMix | " + defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <main>{children}</main>
            <Toaster />
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
