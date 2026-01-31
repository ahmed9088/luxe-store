import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe - Premium Lifestyle Store",
  description: "Discover our curated collection of premium fashion and lifestyle products",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import AuraBackground from "@/components/AuraBackground";

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="cursor-none">
        <SmoothScroll>
          <AuraBackground />
          <CartProvider>
            <WishlistProvider>
              <CustomCursor />
              <PageTransition>
                {children}
              </PageTransition>
              <Toaster position="bottom-right" expand={false} richColors />
            </WishlistProvider>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
