"use client"

import { getLikedSongs } from "@/actions/getSongs"
import { LikeButton } from "@/components/LikeButton"
import { MediaItem } from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import useUserSession from "@/hooks/useUserSession"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const LikedContent = () => {
  const router = useRouter()
  const { user } = useUserSession()
  const [songs, setSongs] = useState<Song[]>([])
  const onPlay = useOnPlay(songs)

  useEffect(() => {
    if (!user) {
      router.replace("/")
    }
    const fetchLikedSong = async () => {
      if (!user) {
        return setSongs([])
      }
      const song = await getLikedSongs(user?.id)
      setSongs(song)
    }
    fetchLikedSong()
  }, [user, router])

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song?.id}>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song?.id} />
        </div>
      ))}
    </div>
  )
}
