"use client"

import { Song } from "@/types"
import Image from "next/image"
import { PlayButton } from "./PlayButton"

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export const SongItem = ({ data, onClick }: SongItemProps) => {
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={
            `http://localhost:5001/api/storage/${data.image_path}` ||
            "/images/note.png"
          }
          alt="Image"
          fill
          priority
        />
      </div>

      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}
