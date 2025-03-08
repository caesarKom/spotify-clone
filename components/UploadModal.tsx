"use client"

import { useUploadModal } from "@/hooks/useUploadModal"
import { Modal } from "./Modal"
import { FieldValue, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import useUserSession from "@/hooks/useUserSession"

export const Uploadmodal = () => {
  const router = useRouter()
  const [isloading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const { user } = useUserSession()

  const { register, handleSubmit, reset } = useForm<FieldValue>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  })

  const onSubmit: SubmitHandler<FieldValue> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]
      const author = values.author
      const title = values.title

      if (!imageFile || !songFile || !user) {
        toast.error("Missing Fields!")
        return
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/song/add`,
        {
          title,
          userId: user.id,
          author,
          image: imageFile,
          song: songFile,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      if (res.data.success) {
        router.refresh()
        setIsLoading(false)
        toast.success("Song added successfuly")
        uploadModal.onClose()
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isloading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isloading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isloading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isloading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button disabled={isloading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}
