import { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/constants/api'
import { cacheWrapper } from '@/components/utils/cache.utils'
import MovieService from '@/services/MoviesService'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const slug = req.query.slug?.toString() || ''

  const defaultURL = process.env.DEFAULT_URL || baseUrl

  try {
    const service = new MovieService(defaultURL)
    const cacheFetchData = cacheWrapper(service.fetchMovieData, 432000)
    const result = await cacheFetchData(slug)
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' })
  }
}
