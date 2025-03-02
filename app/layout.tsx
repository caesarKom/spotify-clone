import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import UserProvider from "@/components/providers/user-provider"
import { ModalProvider } from "@/components/providers/modal-provider"

const figtree = Figtree({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen to music!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        <UserProvider>
          <ModalProvider />
          <Sidebar>{children}</Sidebar>
        </UserProvider>
      </body>
    </html>
  )
}
