import { Song } from "@/types"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [song, setSong] = useState<Song | undefined>(undefined)

  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    const fetchSong = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/song/songs/${id}`
      )
      if (response.data.success) {
        setSong(response.data.data[0])
        setIsLoading(false)
      } else {
        toast.error("Something went wrong")
        setIsLoading(false)
      }
    }
    fetchSong()
  }, [id])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  )
}

export default useGetSongById
