import { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import { baseUrl } from '@/constants/api'
import { cacheWrapper } from '@/components/utils/cache.utils'
import cheerio from 'cheerio'

function HandleNotFoundError(res: NextApiResponse): void {
  res.status(404).json({ message: 'Not Found' })
}

function getMovieLinkText(label: string): string {
  const match = label.match(/(.+)\s+\((\d+p?)\)/)
  if (match) {
    const name = match[1]
    const quality = match[2]
    return `${name} (${quality})`
  } else {
    return label
  }
}

interface Movie {
  title?: string | null
  image?: string
  slug: string
  description?: string
  embed?: string
  links: { label: string; link: string }[]
}

async function fetchData(url: string): Promise<Movie> {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  const elementMovieImage = $('img.img-fluid')
  if (!elementMovieImage.length) {
    throw new Error('Not Found')
  }
  const movieImage = elementMovieImage.attr('src')

  const infoDiv = $('#informacoes')
  if (!infoDiv.length) {
    throw new Error('Not Found')
  }

  const movieTitle = infoDiv.find('strong').html()

  const sinopseDiv = $('#sinopse')
  if (!sinopseDiv.length) {
    throw new Error('Not Found')
  }
  const movieSinopse = sinopseDiv.find('p').text().trim()

  let movieEmbed = ''
  const embedIframe = $('iframe.embed-responsive-item')
  if (embedIframe.length) {
    movieEmbed = embedIframe.attr('src') || ''
  }

  const movieLinks: { label: string; link: string }[] = []
  const downloadP = $('#lista_download')
  if (!downloadP.length) {
    throw new Error('Not Found')
  }
  downloadP.find('span').each((i, el) => {
    const label = $(el).text()
    movieLinks.push({ label: getMovieLinkText(label), link: '' })
  })
  const downloadLinks = downloadP.find('a.btn')
  downloadLinks.each((i, el) => {
    const link = $(el).attr('href') || ''
    if (i < movieLinks.length) {
      movieLinks[i].link = link
    }
  })

  const movie: Movie = {
    title: movieTitle,
    image: movieImage,
    slug: url.split('/').pop() || '',
    description: movieSinopse || undefined,
    embed: movieEmbed || undefined,
    links: movieLinks,
  }

  return movie
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const slug = req.query.slug?.toString()
  if (!slug) {
    HandleNotFoundError(res)
    return
  }

  const defaultURL = process.env.DEFAULT_URL || baseUrl
  const url = `${defaultURL}${slug}/`

  try {
    const cacheFetchData = cacheWrapper(fetchData, 500)
    const result = await cacheFetchData(url)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error || 'Internal Server Error' })
  }
}
