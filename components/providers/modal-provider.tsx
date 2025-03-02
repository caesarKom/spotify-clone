"use client"

import { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setIsMounded] = useState(false)

  useEffect(() => {
    setIsMounded(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>Modal !</>
}
