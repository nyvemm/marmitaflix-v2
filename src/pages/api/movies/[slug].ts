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

  const elementMovieImage = $('img.jetpack-lazy-image')
  if (!elementMovieImage.length) {
    throw new Error('Not Found')
  }
  const movieImage = elementMovieImage.attr('src')

  const infoDiv = $('div.entry-content')
  if (!infoDiv.length) {
    throw new Error('Not Found')
  }

  const movieTitle = $('.entry-title > a').first().text()

  const sinopseDiv = infoDiv.find('p')
  let movieSinopse = ''
  for (let i = 0; i < sinopseDiv.length; i++) {
    const style = $(sinopseDiv[i]).attr('style')
    if (style && style.includes('text-align: justify')) {
      movieSinopse = $(sinopseDiv[i]).text()
      break
    }
  }
  if (!movieSinopse.length) {
    throw new Error('Not Found')
  }
  console.log(movieSinopse)

  let movieEmbed = ''
  const embedIframe = $('iframe').first()
  movieEmbed = embedIframe.attr('src') || ''

  const movieLinks: { label: string; link: string }[] = []
  const downloadP = infoDiv.find('a')
  if (!downloadP.length) {
    throw new Error('Not Found')
  }

  for (let i = 0; i < downloadP.length; i++) {
    const href = $(downloadP[i]).attr('href')
    if (href && href.includes('magnet')) {
      const parentElement = $(downloadP[i]).parent()
      if (parentElement) {
        const leftParentSibling = parentElement.prev()
        if (leftParentSibling) {
          const siblingText = leftParentSibling.text()
          movieLinks.push({ label: siblingText, link: href ?? '' })
        }
      }
    }
  }

  console.log(url.split('/'))
  const movie: Movie = {
    title: movieTitle,
    image: movieImage,
    slug: url.split('/').at(-2) || '',
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
