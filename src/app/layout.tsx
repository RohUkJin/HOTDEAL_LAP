import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "./GlobalStyles";
import { ThemeProvider } from "@/context/ThemeContext";

import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bmHanna = localFont({
  src: "../../public/fonts/BMHANNAPro.ttf",
  variable: "--font-bmhanna",
});

export const metadata: Metadata = {
  title: "핫딜 연구소",
  description: "AI를 활용한 실시간 커뮤니티 핫딜 수집 및 스마트 추천 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bmHanna.variable}`}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
