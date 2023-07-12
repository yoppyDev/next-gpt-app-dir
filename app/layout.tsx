import React from "react";
import '#/styles/globals.css';
import { Metadata } from 'next';

let title = "chatRoom";
let description = "chatRoom";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        >
          <script> </script>
          <div className="rounded-lg p-px shadow-lg shadow-black/20">
            <div className="rounded-lg">{children}</div>
          </div>
      </body>
    </html>
  );
}
