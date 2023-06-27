import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/ui-kit';
import { AppProvider } from '@/redux/app-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Payoneer Dashboard',
  description: 'Dashboard to show payoneer stats ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full bg-gray-100'>
    <body className={`h-full ${inter.className}`}>
    <AppProvider>
      <ThemeProvider>
        <div className='min-h-full'>
          <header className='bg-white shadow'>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Dashboard</h1>
            </div>
          </header>
          <main>
            <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
              {children}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </AppProvider>
    </body>
    </html>
  );
}
