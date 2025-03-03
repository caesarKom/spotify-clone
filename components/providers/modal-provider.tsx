"use client"

import { useEffect, useState } from "react"
import { AuthModal } from "../AuthModal"

export const ModalProvider = () => {
  const [isMounted, setIsMounded] = useState(false)

  useEffect(() => {
    setIsMounded(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
    </>
  )
}
