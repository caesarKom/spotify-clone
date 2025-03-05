"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { UserContext } from "@/hooks/useUser"
import axios from "axios"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface UserProps {
  email: string
  password: string
}

export const LoginForm = () => {
  const { onOpenRegister, onClose } = useAuthModal()
  const { setUser, setAccessToken } = useContext(UserContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginUser = async (data: UserProps) => {
    try {
      await axios
        .post("http://192.168.0.7:5001/api/user/login", {
          data,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure Axios includes cookies in the request
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message)
            setUser(res.data.user)
            setAccessToken(res.data.accessToken)
            onClose()
          } else {
            toast.error("Something went wrong")
          }
        })
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className="mx-auto max-w-screen-md"
    >
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          id="email"
          autoFocus
          {...register("email", {
            required: "Please enter email",
          })}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          id="password"
          autoFocus
          {...register("password", {
            required: "Please enter password",
          })}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      <div className="mb-4 mt-10 flex justify-center">
        <button className="text-xl font-semibold bg-gradient-to-b from-emerald-700 w-full h-12 rounded-2xl hover:opacity-75 cursor-pointer transition-all duration-300">
          Login
        </button>
      </div>

      <div className="mb-4 mt-8">
        Don&apos;t have an account?{" "}
        <span
          className="cursor-pointer underline text-md"
          onClick={onOpenRegister}
        >
          {" "}
          Register
        </span>{" "}
      </div>
    </form>
  )
}
