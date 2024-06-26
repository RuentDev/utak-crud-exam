import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Components from "@/components";
import { Flex } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTAK CRUD EXAM",
  description: "BASE CRUD EXAMPLE USING FIREBASE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Components.ChakraUIProvider>
          <Flex w="100%" h="100vh">
            <Components.Sidebar />
              {children}
          </Flex>
        </Components.ChakraUIProvider>
      </body>
    </html>
  );
}
