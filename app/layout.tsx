import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Luxe - Premium Lifestyle Store",
  description: "Discover our curated collection of premium fashion and lifestyle products",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AuraBackground from "@/components/AuraBackground";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${sans.variable} ${serif.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        <AuraBackground />
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster position="bottom-right" expand={false} richColors />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
