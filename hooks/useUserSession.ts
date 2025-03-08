import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  id: string
  name: string
  email: string
  apiKey: string
}

type SessionState = {
  user: User | null
  accessToken: string | null
  refreshToken?: string | null
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken?: string) => void
  logout: () => void
}

const useUserSession = create<SessionState>(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken) => set({ accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "user-session", // the key used in localStorage to store the session
      getStorage: () => localStorage, // use localStorage to persist the state
    }
  )
)

export default useUserSession
