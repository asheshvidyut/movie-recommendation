import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Disney Hotstar clone",
  description: "For educational purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#1A1C29]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
