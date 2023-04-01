import { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/constants/api'
import MovieService from '@/services/MoviesService'
import { generateUrl } from '@/utils/query.builder.utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const search = req.query.search?.toString() || ''
  const page = req.query.page?.toString() || '1'

  const defaultURL = process.env.DEFAULT_URL || baseUrl
  const url = generateUrl({ search, page }, defaultURL)

  try {
    const service = new MovieService(defaultURL)
    const moviesList = await service.fetchMovies(url)
    res.json(moviesList)
  } catch (error) {
    res.status(200).json([])
  }
}
