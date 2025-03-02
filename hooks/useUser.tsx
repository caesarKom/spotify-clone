"use client"

import { createContext, useContext, useState } from "react"

type UserContexType = {
  accessToken: string | null
}

export const UserContext = createContext<UserContexType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  // get user
  // get subscryption

  const value = {
    accessToken,
    user,
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
