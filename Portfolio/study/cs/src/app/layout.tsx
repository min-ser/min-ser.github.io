import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS://FOUNDATION",
  description: "Computer Science learning map and study foundation",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
