import { MediaGrid, Navbar, NotFound } from '@/components'
import { useContext, useEffect, useMemo, useState } from 'react'

import { CategoryContext } from '@/contexts/CategoryContext'
import { GlobalContainer } from '@/styles/shared'
import { MoviesModel } from '@/models'
import { SearchContext } from '@/contexts/SearchContext'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Spinner } from 'react-activity'

const baseUrl = '/api'

export type MediaFetchContainerProps = {
  searchUrl?: string
}

export default function MediaFetchContainer({ searchUrl }: MediaFetchContainerProps) {
  const [page, setPage] = useState(1)
  const [hasEnded, setHasEnded] = useState(false)
  const [moviesData, setMoviesData] = useState<MoviesModel>([])
  const [oldSearchInput, setOldSearchInput] = useState<string | undefined>(undefined)
  const [oldCategory, setOldCategory] = useState<string | undefined>(undefined)
  const { searchInput } = useContext(SearchContext)
  const { category } = useContext(CategoryContext)

  const url = useMemo(() => {
    if (searchInput !== oldSearchInput) {
      setMoviesData([])
      setPage(1)
      setHasEnded(false)
      setOldSearchInput(searchInput)
    }
    if (category !== oldCategory) {
      setMoviesData([])
      setPage(1)
      setHasEnded(false)
      setOldCategory(category)
    }
    if (searchUrl !== '') {
      return `${baseUrl}/movies/search/${searchUrl}?page=${page}`
    } else if (category !== 'all') {
      let mappedCategories = {
        movies: 'filmes',
        shows: 'series',
        animes: 'desenhos',
      }
      return `${baseUrl}/movies?category=${mappedCategories[category]}&page=${page}`
    } else {
      return `${baseUrl}/movies?page=${page}`
    }
  }, [page, searchUrl, category])

  const { data, isLoading, error } = useQuery(['movies', url], async () => {
    const { data } = await axios.get<MoviesModel>(url)
    if (data === null) {
      setHasEnded(true)
      return data
    }
    if (page < 3) {
      onFetchMore()
    }
    const uniqueSlugs = new Set(moviesData.map((movie) => movie.slug))
    data.forEach((movie) => {
      if (!uniqueSlugs.has(movie.slug)) {
        uniqueSlugs.add(movie.slug)
        moviesData.push(movie)
      }
    })
    setMoviesData(moviesData)
  })

  const onFetchMore = () => {
    setPage(page + 1)
  }

  return (
    <GlobalContainer>
      <header>
        <Navbar />
      </header>
      <main>
        {hasEnded && page === 1 ? (
          <NotFound />
        ) : (
          <MediaGrid movies={moviesData || []} isLoading={isLoading} error={error} onFetchMore={onFetchMore} hasEnded={hasEnded} />
        )}
      </main>
    </GlobalContainer>
  )
}
