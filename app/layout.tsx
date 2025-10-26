import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TCOProvider } from '@/contexts/TCOContext';
import AppLayout from '@/components/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nerdio TCO Calculator - Total Cost of Ownership Analysis',
  description: 'Comprehensive TCO calculator for Azure Virtual Desktop with Nerdio Manager',
  keywords: 'Nerdio, Azure Virtual Desktop, AVD, TCO, Cost Calculator, Cloud Computing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TCOProvider>
          <AppLayout>{children}</AppLayout>
        </TCOProvider>
      </body>
    </html>
  );
}
