import { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import { baseUrl } from '@/constants/api'
import cheerio from 'cheerio'
import { getSlugFromLink } from '@/utils/link.utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const search = req.query.search?.toString() || ''
  const page = req.query.page?.toString() || '1'

  const defaultURL = process.env.DEFAULT_URL || baseUrl
  const url = `${defaultURL}${search}/${page}/`

  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const movies = $('div.capa_lista')

    const moviesList: { title: string; image: string; slug: string }[] = []

    movies.each((i, el) => {
      const movieTitle = $(el).find('a').attr('title') || ''
      const movieLink = $(el).find('a').attr('href') || ''
      const movieImage = $(el).find('img').attr('src') || ''
      moviesList.push({
        title: movieTitle,
        image: movieImage,
        slug: getSlugFromLink(movieLink),
      })
    })

    res.json(moviesList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error || 'Internal Server Error' })
  }
}
