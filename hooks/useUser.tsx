"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { User } from "@/types"

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
  const [user, setUser] = useState(null)
  // get user
  // get subscryption

  useEffect(() => {
    const checkloggedUser = async () => {
      const res = await axios.post(
        "http://192.168.0.7:5001/api/user/checkLoginUser"
      )
      //setUser(res.data.data)
      console.log("CONTEXT ---> ", res.data)
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
