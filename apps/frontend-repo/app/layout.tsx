import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from '@mui/material/styles';
import { pageTheme } from "../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "E-Buddy Front end Assignment",
  description: "E-Buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={pageTheme} disableTransitionOnChange>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
