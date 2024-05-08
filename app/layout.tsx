import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bilibili 视频解析下载",
  description: "轻松下载睿站视频（）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body  className="min-h-[100vh]">{children}</body>
    </html>
  );
}
