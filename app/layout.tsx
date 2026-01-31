import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe - Premium Lifestyle Store",
  description: "Discover our curated collection of premium fashion and lifestyle products",
};

import { CartProvider } from "@/context/CartContext";

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" expand={false} richColors />
        </CartProvider>
      </body>
    </html>
  );
}
