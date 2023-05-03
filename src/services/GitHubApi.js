import axios from 'axios'

export async function fetchData(progLang) {
  const GITHUB_API_URL = `https://api.github.com/search/repositories?q=language:${progLang}&per_page=10`

  try {
    const response = await axios.get(GITHUB_API_URL)
    const { items } = response.data
    return items
  } catch (error) {
    console.error(error)
  }
}

export async function fetchDataByFilter(progLang, filter) {
  const GITHUB_API_URL = `https://api.github.com/search/repositories?q=language:${progLang}&per_page=10&sort=${filter}`

  try {
    const response = await axios.get(GITHUB_API_URL)
    const { items } = response.data
    return items
  } catch (error) {
    console.error(error)
  }
}
