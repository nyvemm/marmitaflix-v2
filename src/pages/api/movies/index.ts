import { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import { baseUrl } from '@/constants/api'
import { cacheWrapper } from '@/components/utils/cache.utils'
import cheerio from 'cheerio'
import { getSlugFromLink } from '@/utils/link.utils'

interface Movie {
  title?: string
  image?: string
  slug: string
}

async function fetchData(url: string): Promise<Movie[]> {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)
  const movies = $('div.capa_lista')

  const moviesList: Movie[] = movies
    .map((i, el) => ({
      title: $(el).find('a').attr('title'),
      image: $(el).find('img').attr('src'),
      slug: getSlugFromLink($(el).find('a').attr('href') || ''),
    }))
    .get()

  return moviesList
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', category } = req.query
  const defaultURL = process.env.DEFAULT_URL || baseUrl
  const url = category ? `${defaultURL}/${category}/${page}/` : `${defaultURL}/${page}/`

  try {
    const cacheFetchData = cacheWrapper(fetchData, 500)
    const result = await cacheFetchData(url)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error || 'Internal Server Error' })
  }
}