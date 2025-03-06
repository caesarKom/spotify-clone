"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface LikeButtonProps {
  songId: string
}

export const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter()
  const authModal = useAuthModal()
  const { user } = useUser()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    const fetchData = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/song/liked`,
        {
          userId: user.id,
          songId: songId,
        }
      )
      if (!res.data.data === null) {
        setIsLiked(true)
      }
    }
    fetchData()
  }, [songId, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpenLogin()
    }
    if (isLiked) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/song/deleteLike`,
        {
          params: {
            userId: user.id,
            songId: songId,
          },
        }
      )
      if (res.data.success) {
        setIsLiked(false)
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/song/newLiked`,
        {
          userId: user.id,
          songId: songId,
        }
      )
      if (res.data.success) {
        setIsLiked(true)
        toast.success("Liked!")
      }
    }

    router.refresh()
  }

  return (
    <button
      className="hover:opacity-75 transition cursor-pointer"
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "#ffffff"} size={25} />
    </button>
  )
}
