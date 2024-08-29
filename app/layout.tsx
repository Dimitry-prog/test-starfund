import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import Header from '@/shared/components/header';
import StoreProvider from '@/shared/components/store-provider';
import { Toaster } from '@/shared/components/ui/sonner';
import { cn } from '@/shared/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'E-com',
  description: 'Shopping there',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={cn(
            'flex min-h-[100dvh] flex-col bg-background font-sans antialiased',
            inter.variable
          )}
        >
          <Header />
          <main className="container my-6 flex-1">{children}</main>
          <Toaster position="top-center" />
        </body>
      </StoreProvider>
    </html>
  );
}
