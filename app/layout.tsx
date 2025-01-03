import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import QueryProviderComponent from "@/hooks/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Loglib from "@loglib/tracker/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Championis",
  description: "Your Vulnerability Champion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <QueryProviderComponent>
        <body className={`${inter.className} light bg-white`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}{" "}
            <Loglib
              config={{
                id: "vulnchamp",
              }}
            />
          </ThemeProvider>
        </body>
      </QueryProviderComponent>
    </html>
  );
}