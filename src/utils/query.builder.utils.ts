export type QueryOptions = {
  search?: string
  page?: string
  category?: string
}

type CategoryUrlMap = {
  [key: string]: string
}

const CATEGORY_URLS: CategoryUrlMap = {
  filmes: 'filmes/',
  series: 'genero/nacional/',
  desenhos: 'genero/animacao/',
}

export function generateUrl(options: QueryOptions, baseUrl: string = process.env.DEFAULT_URL || ''): string {
  const { search, page = '1', category } = options

  const pageNumber = parseInt(page)

  if (isNaN(pageNumber)) {
    throw new Error('Invalid page number')
  }

  const url = new URL(baseUrl)

  if (category && CATEGORY_URLS[category]) {
    url.pathname += CATEGORY_URLS[category]
  }

  if (pageNumber !== 1) {
    url.pathname += `page/${pageNumber}/`
  }

  if (search) {
    url.searchParams.append('s', search)
  }

  return url.href
}
