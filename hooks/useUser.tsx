"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { User } from "@/types"
import useUserSession from "./useUserSession"

type UserContexType = {
  accessToken: string | null
  user: User | null
}

export const UserContext = createContext<UserContexType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  //const [isLoading, setIsLoading] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const { user, setUser, logout } = useUserSession()

  useEffect(() => {
    const checkloggedUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/checkLoginUser`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        if (data === null) {
          logout()
        }
      }
    }
    checkloggedUser()
  }, [])

  const value = {
    accessToken,
    user,
    setUser,
    setAccessToken,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used with in a MyUserContextProvider")
  }
  return context
}
