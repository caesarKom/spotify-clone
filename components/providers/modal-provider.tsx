"use client"

import { useEffect, useState } from "react"
import { AuthModal } from "../AuthModal"
import { Uploadmodal } from "../UploadModal"

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
      <Uploadmodal />
    </>
  )
}
