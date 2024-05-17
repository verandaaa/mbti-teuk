import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryContextProvider } from "@/lib/react-query/ReactQueryContext";
import Navbar from "@/components/Navbar";
import AuthSubscriber from "@/lib/supabase/AuthSubscriber";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MBTI특",
  description: "mbti별 투표 결과를 알아보자",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ReactQueryContextProvider>
          <AuthSubscriber />
          <header className="border-b">
            <div className="mx-auto px-6 max-w-screen-xl">
              <Navbar />
            </div>
          </header>
          <main className="mx-auto px-6 py-16 max-w-screen-lg">{children}</main>
        </ReactQueryContextProvider>
      </body>
    </html>
  );
}
