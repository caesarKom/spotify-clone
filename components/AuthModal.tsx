"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { Modal } from "./Modal"
import { LoginForm } from "./forms/login-form"
import { RegisterForm } from "./forms/register-form"

export const AuthModal = () => {
  const { onClose, isOpen, type } = useAuthModal()

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      title={type === "login" ? "Welcome back" : "Create account"}
      description={
        type === "login" ? "Login to your account" : "Create new account"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      {type === "login" ? <LoginForm /> : <RegisterForm />}
    </Modal>
  )
}
