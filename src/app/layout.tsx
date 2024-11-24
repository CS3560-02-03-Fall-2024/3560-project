import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import Providers from "./api/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col px-[100px] pt-20 pb-[10px] bg-white">
          <Navbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
