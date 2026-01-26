import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Yeni oluşturduğumuz bileşenleri import ediyoruz
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sitenin Google'da nasıl görüneceğini buradan ayarlıyoruz
export const metadata: Metadata = {
  title: "Cey Yatırım Holding | Geleceğe Değer Katan Yatırımlar",
  description: "İnşaat, Tarım, Enerji ve Gayrimenkul alanlarında modern yatırım çözümleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr"> {/* Dil seçeneğini TR yaptık */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Navbar />
        {/* children, page.tsx içindeki tüm içeriği buraya basar */}
        <main className="min-h-screen pt-20"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}