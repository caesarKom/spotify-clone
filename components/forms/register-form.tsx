import { useAuthModal } from "@/hooks/useAuthModal"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface UserProps {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { onOpenLogin } = useAuthModal()

  const registerUser = async (data: UserProps) => {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message)
            onOpenLogin()
          } else {
            toast.error("Something went wrong")
          }
        })
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className="mx-auto max-w-screen-md"
    >
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          id="name"
          autoFocus
          {...register("name", {
            required: "Please enter name",
          })}
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter valid email",
            },
          })}
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          id="email"
        ></input>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: { value: 6, message: "password is more than 5 chars" },
          })}
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          id="password"
          autoFocus
        ></input>
        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="w-full border border-neutral-500 px-2.5 py-2.5 rounded-md outline-none pl-8 mt-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:bg-neutral-800"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please enter confirm password",
            validate: (value) => value === getValues("password"),
            minLength: {
              value: 6,
              message: "confirm password is more than 5 chars",
            },
          })}
        />
        {errors.confirmPassword && (
          <div className="text-red-500 ">{errors.confirmPassword.message}</div>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <div className="text-red-500 ">Password do not match</div>
          )}
      </div>

      <div className="mb-4 mt-10 flex justify-center">
        <button className="text-xl font-semibold bg-gradient-to-b from-emerald-700 w-full h-12 rounded-2xl hover:opacity-75 cursor-pointer transition-all duration-300">
          Register
        </button>
      </div>

      <div className="mb-4 mt-8">
        Already have an account?{" "}
        <span
          className="cursor-pointer underline text-md"
          onClick={onOpenLogin}
        >
          {" "}
          Login
        </span>{" "}
      </div>
    </form>
  )
}
