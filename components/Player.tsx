"use client"

import useGetSongById from "@/hooks/useGetSongById"
import usePlayer from "@/hooks/usePlayer"
import { PlayerContent } from "./PlayerContent"

export const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage/${song?.song_path}`

  if (!player.activeId || !songUrl || !song) return null

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-20 px-4">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  )
}
