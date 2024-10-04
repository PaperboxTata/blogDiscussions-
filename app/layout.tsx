import type { Metadata } from "next";
import "./globals.css";

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

import Header from "@/components/Header";
import dynamic from 'next/dynamic'
export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Footer = dynamic(() => import('@/components/Footer'))
  return (
    <html lang="cn">
      <body>
        <Header />
        <div id="main">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
