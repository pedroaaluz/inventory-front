"use client";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  pages: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
