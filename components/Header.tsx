"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
import { useAuthModal } from "@/hooks/useAuthModal"
import { useContext } from "react"
import { UserContext } from "@/hooks/useUser"
import { FaUserAlt } from "react-icons/fa"

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

export const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter()
  const { onOpenLogin, onOpenRegister } = useAuthModal()
  const { user, setUser, setAccessToken } = useContext(UserContext)

  const logoutUser = async () => {
    const res = await axios.post("http://192.168.0.7:5001/api/user/logout")
    setUser(null)
    setAccessToken(null)
    console.log("Logout data ---> ", res.data)
  }

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition cursor-pointer"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition cursor-pointer"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        {/* mobile view */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition cursor-pointer">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* auth */}
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={() => logoutUser()}
                className="bg-white px-6 py-2 cursor-pointer"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white cursor-pointer"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpenRegister}
                  className="bg-transparent text-neutral-300 font-medium inline cursor-pointer"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={onOpenLogin}
                  className="bg-white px-6 py-2 cursor-pointer"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
