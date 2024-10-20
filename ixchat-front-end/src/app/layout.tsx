import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/provider";


export const metadata: Metadata = {
  title: "IXChat",
  description: "App chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Provider>
          {children}
        </Provider>

      </body>
    </html>
  );
}
