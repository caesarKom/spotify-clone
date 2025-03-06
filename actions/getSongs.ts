import axios from "axios"

export const getSongs = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/song/list`
  )
  if (response.data.success) {
    return response.data.data
  }
  return []
}

export const getSongsByUserId = async (userId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/song/${userId}`
  )
  if (response.data.success) {
    return response.data.data
  }
  return []
}

export const getSongbyTitle = async (title: string) => {
  if (!title) {
    return []
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/song/search/${title}`
  )

  if (response.data.success) {
    return response.data.data
  }
  return []
}

export const getLikedSongs = async (userId: string) => {
  if (!userId) return []

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/song/list-liked/${userId}`
  )

  if (response.data.success) {
    return response.data.data.map((item) => ({
      ...item.songs,
    }))
  }
  return []
}
