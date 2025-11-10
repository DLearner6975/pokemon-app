import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const superAdorable = localFont({
  src: './fonts/SuperAdorable-MAvyp.ttf',
  variable: '--font-super-adorable',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Pikachu and Friends',
  icons: {
    icon: '/pikachu.svg',
    shortcut: '/pikachu.svg',
  },
  description:
    'This is a complete list of all the pokemons and their details.  Gotta catch them all!',
  authors: [{ name: 'D.Yilla' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${superAdorable.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
