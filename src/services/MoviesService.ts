import { extractSlugFromLink } from '@/utils/link.utils'
import axios from 'axios'
import cheerio from 'cheerio'
import HTTPService from './HttpService'

interface Movie {
  title?: string | null
  image?: string
  slug: string
  description?: string
  embed?: string
  links?: { label: string; link: string }[]
}

class MovieService {
  private readonly baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.fetchMovies = this.fetchMovies.bind(this)
    this.fetchMovieData = this.fetchMovieData.bind(this)
  }

  async fetchMovies(url: string): Promise<Movie[]> {
    try {
      const pageHtml = await HTTPService.fetchHtml(url)
      const cheerioInstance = cheerio.load(pageHtml)
      const movieArticles = cheerioInstance('article.blog-view')

      if (!movieArticles || !movieArticles.length) {
        return []
      }

      const parsedMovies: Movie[] = movieArticles
        .map((index: number, element: cheerio.Element): Movie => {
          const elementInstance = cheerioInstance(element)
          const title = elementInstance.find('h2').text()
          const image = elementInstance.find('img').attr('src') || ''
          const slug = extractSlugFromLink(elementInstance.find('a').attr('href') || '')

          if (!title || !slug) {
            throw new Error('Failed to parse movie data')
          }

          return { title, image, slug }
        })
        .get()

      if (!parsedMovies || !parsedMovies.length) {
        throw new Error('No movies parsed')
      }

      return parsedMovies
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return []
        }
      }
      console.error(`Error fetching data from ${url}`)
      throw new Error('Failed to fetch movies data')
    }
  }

  async fetchMovieData(movieSlug: string): Promise<Movie> {
    try {
      const movieUrl = `${this.baseURL}${movieSlug}`
      const pageHtml = await HTTPService.fetchHtml(movieUrl)
      const cheerioInstance = cheerio.load(pageHtml)
      const movieImageData = cheerioInstance('img.jetpack-lazy-image')

      if (!movieImageData || !movieImageData.length) {
        throw new Error('Movie image not found')
      }

      const movieImage = movieImageData.attr('src')
      const movieInfoDiv = cheerioInstance('div.entry-content')

      if (!movieInfoDiv || !movieInfoDiv.length) {
        throw new Error('Movie information not found')
      }

      const movieTitle = cheerioInstance('.entry-title > a').first().text()
      const summaryDiv = movieInfoDiv.find('p')
      let movieSummary = ''

      for (let i = 0; i < summaryDiv.length; i++) {
        const style = cheerioInstance(summaryDiv[i]).attr('style')
        if (style && style.includes('text-align: justify')) {
          movieSummary = cheerioInstance(summaryDiv[i]).text()
          break
        }
      }

      if (!movieSummary || !movieSummary.length) {
        throw new Error('Movie summary not found')
      }

      let movieEmbedUrl = ''
      const embedIframe = cheerioInstance('iframe').first()
      movieEmbedUrl = embedIframe.attr('src') || ''

      const movieDownloadLinks: { label: string; link: string }[] = []
      const downloadLinks = movieInfoDiv.find('a')
      if (!downloadLinks || !downloadLinks.length) {
        throw new Error('Movie download links not found')
      }

      for (let i = 0; i < downloadLinks.length; i++) {
        const href = cheerioInstance(downloadLinks[i]).attr('href')
        if (href && href.includes('magnet')) {
          const parentElement = cheerioInstance(downloadLinks[i]).parent()
          if (parentElement) {
            const leftParentSibling = parentElement.prev()
            if (leftParentSibling) {
              const siblingText = leftParentSibling.text()
              movieDownloadLinks.push({ label: siblingText, link: href ?? '' })
            }
          }
        }
      }

      const movie: Movie = {
        title: movieTitle,
        image: movieImage,
        slug: movieUrl.split('/').at(-2) || '',
        description: movieSummary || undefined,
        embed: movieEmbedUrl || undefined,
        links: movieDownloadLinks,
      }

      return movie
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Movie not found')
        }
      } else {
        console.error(`Error fetching data for movie: ${movieSlug}`)
        throw new Error('Failed to fetch movie data')
      }
      return { slug: movieSlug }
    }
  }
}

export default MovieService
