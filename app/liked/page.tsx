import { Header } from "@/components/Header"
import Image from "next/image"
import { LikedContent } from "./_components/LikedContent"

export const revalidate = 0

export default async function LikedPage() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                alt="PlayList"
                className="object-cover rounded-md"
                src="/images/liked.png"
              />
            </div>

            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">PlayList</p>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent />
    </div>
  )
}
