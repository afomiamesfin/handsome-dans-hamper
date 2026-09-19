import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Handsome Dan's Hamper",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Nunito:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}