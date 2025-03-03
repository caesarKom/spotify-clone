import { useAuthModal } from "@/hooks/useAuthModal"
import axios from "axios"
import { useForm } from "react-hook-form"

export const LoginForm = () => {
  const { onOpenRegister } = useAuthModal()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm()

  return (
    <form className="mx-auto max-w-screen-md">
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
          type="text"
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
