import { getSongbyTitle } from "@/actions/getSongs"
import { Header } from "@/components/Header"
import { SearchContent } from "@/components/SearchContent"
import { SearchInput } from "@/components/SearchInput"

interface SearchPageProps {
  searchParams: {
    title: string
  }
}
export const revalidate = 0

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const songs = await getSongbyTitle(params.title)

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-2xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  )
}
