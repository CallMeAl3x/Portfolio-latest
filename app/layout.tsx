import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Portfolio Alexandre Bonefons",
  description: "description // add a description",
  icons: {
    icon: "/img/logo.jpg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-left" duration={2000} />
      </body>
    </html>
  );
}
