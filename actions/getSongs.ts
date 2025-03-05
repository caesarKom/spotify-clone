import axios from "axios"

export const getSongs = async () => {
  const response = await axios.get(`${process.env.API_URL}/song/list`)
  if (response.data.success) {
    return response.data.data
  }
  return []
}

export const getSongsByUserId = async (userId: string) => {
  const response = await axios.get(`${process.env.API_URL}/song/${userId}`)
  if (response.data.success) {
    return response.data.data
  }
  return []
}

export const getSongsbyTitle = async (title: string) => {
  // if (!title) {
  //   return []
  // }
  const response = await axios.get(`${process.env.API_URL}/song/search`, {
    params: { title },
  })
  console.log("Response ======> ", response.data)
  if (response.data.success) {
    return response.data.data
  }
  return []
}
