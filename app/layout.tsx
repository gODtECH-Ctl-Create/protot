import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Percepta — AI Communications Intelligence',
  description: 'Interactive frontend prototype for Percepta.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
