import { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import { baseUrl } from '@/constants/api'
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
  const movies = $('article.blog-view')

  const moviesList: Movie[] = movies
    .map((i, el) => ({
      title: $(el).find('h2').text(),
      image: $(el).find('img').attr('src'),
      slug: getSlugFromLink($(el).find('a').attr('href') || ''),
    }))
    .get()

  return moviesList
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const search = req.query.search?.toString() || ''
  const page = req.query.page?.toString() || '1'

  const defaultURL = process.env.DEFAULT_URL || baseUrl
  let url = defaultURL

  if (page !== '1') {
    url += `page/${page}/`
  }

  if (search) {
    url += `?s=${search}`
  }

  try {
    const moviesList = await fetchData(url)
    res.json(moviesList)
  } catch (error) {
    console.error(error)
    res.status(200).json([])
  }
}
