import { Song } from "@/types"
import Image from "next/image"

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

export const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick(data?.id)
    }
  }

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div className="relative rounded-md min-h-12 min-w-12 overflow-hidden">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_API_URL}/storage/${data?.image_path}` ||
            "/images/note.png"
          }
          alt="Image"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data?.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data?.author}</p>
      </div>
    </div>
  )
}
