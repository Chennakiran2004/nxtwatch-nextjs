import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./registry";
import { ThemeProvider } from "../context/ThemeContext";
import { ActiveMenuProvider } from "../context/ActiveMenuContext";
import { SavedVideosProvider } from "../context/SavedVideosContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NxtWatch",
  description: "Your personal video streaming platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <ActiveMenuProvider>
              <SavedVideosProvider>{children}</SavedVideosProvider>
            </ActiveMenuProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
