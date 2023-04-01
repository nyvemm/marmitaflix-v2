import { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/constants/api'
import { cacheWrapper } from '@/components/utils/cache.utils'
import { generateUrl } from '@/utils/query.builder.utils'
import MovieService from '@/services/MoviesService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page?.toString() || '1'
  const category = req.query.category?.toString() || ''

  const defaultURL = process.env.DEFAULT_URL || baseUrl
  const url = generateUrl({ category, page }, defaultURL)

  try {
    const service = new MovieService(defaultURL)
    const cacheFetchData = cacheWrapper(service.fetchMovies, 500)
    const result = await cacheFetchData(url)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' })
  }
}
