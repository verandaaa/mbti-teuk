import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryContextProvider } from "@/context/ReactQueryContext";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthContextProvider>
          <header className="border-b">
            <div className="mx-auto px-6 max-w-screen-xl">
              <Navbar />
            </div>
          </header>
          <main className="mx-auto px-6 py-16 max-w-screen-lg">
            <ReactQueryContextProvider>{children}</ReactQueryContextProvider>
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
