"use client"

import { MediaItem } from "@/components/MediaItem"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface LikedContentProps {
  songs: Song[]
}

export const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter()
  const { user } = useUser()

  console.log("Liked song ", songs)

  useEffect(() => {
    if (!user) {
      router.replace("/")
    }
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
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
        </div>
      ))}
    </div>
  )
}
