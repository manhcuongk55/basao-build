import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basao Build | AI-Powered Construction & Home Marketplace",
  description: "Kết nối nhà máy VN & TQ trực tiếp đến công trình. Vật liệu, nội thất, kim khí, điện nước — AI báo giá, Escrow bảo vệ, logistics xuyên biên giới.",
  keywords: "vật liệu xây dựng, nội thất, kim khí, điện nước, nhà cung cấp, Foshan, gạch, sơn, basao",
  openGraph: {
    title: "Basao Build – Marketplace Vật Liệu & Nội Thất",
    description: "AI Procurement Agent cho ngành xây dựng. 30+ sản phẩm, 15 NCC VN+TQ, Escrow an toàn.",
    siteName: "Basao Build",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>
        </div>
        <Navbar />
        <main className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
