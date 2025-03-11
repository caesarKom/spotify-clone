"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { useUploadModal } from "@/hooks/useUploadModal"
import { Song } from "@/types"
import { AiOutlinePlus } from "react-icons/ai"
import { TbPlaylist } from "react-icons/tb"
import { MediaItem } from "./MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import useUserSession from "@/hooks/useUserSession"
import { useEffect, useState } from "react"
import { getSongsByUserId } from "@/actions/getSongs"

export const Library = () => {
  const { user } = useUserSession()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const [songs, setSongs] = useState<Song[]>([])
  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      return authModal.onOpenLogin()
    }
    return uploadModal.onOpen()
  }

  useEffect(() => {
    const fetchSongs = async () => {
      if (!user) {
        return setSongs([])
      }
      const data = await getSongsByUserId(user?.id)
      setSongs(data)
    }
    fetchSongs()
  }, [user])

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>

        <AiOutlinePlus
          className="text-neutral-400 hover:text-white transition cursor-pointer"
          size={20}
          onClick={onClick}
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-2 px-3">
        {songs.length === 0 && (
          <div className="text-center mt-4">No songs found!</div>
        )}
        {user &&
          songs?.map((song) => (
            <MediaItem
              key={song.id}
              onClick={(id: string) => onPlay(id)}
              data={song}
            />
          ))}
      </div>
    </div>
  )
}
