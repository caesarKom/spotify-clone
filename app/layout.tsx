import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import UserProvider from "@/components/providers/user-provider"
import { ModalProvider } from "@/components/providers/modal-provider"
import { ToasterProvider } from "@/components/providers/toast-provider"
import { getSongsByUserId } from "@/actions/getSongs"

const figtree = Figtree({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen to music!",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userSongs = await getSongsByUserId("cm7ud88vj0000u2v8ycy1k64p")

  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        <ToasterProvider />
        <UserProvider>
          <ModalProvider />
          <Sidebar songs={userSongs}>{children}</Sidebar>
        </UserProvider>
      </body>
    </html>
  )
}
