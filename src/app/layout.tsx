import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your team's expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
