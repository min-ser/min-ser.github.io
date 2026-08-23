import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConceptProvider from "@/components/concept/ConceptProvider";

export const metadata: Metadata = {
  title: "NeuralScope",
  description: "Interactive visual learning platform for neural networks and LLM fundamentals."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ConceptProvider>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
        </ConceptProvider>
      </body>
    </html>
  );
}
