import { useContext, useEffect, useMemo, useState } from 'react'

import { GlobalContainer } from '@/styles/shared'
import { MediaGrid } from '@/components/MediaGrid/MediaGrid'
import { MoviesModel } from '@/models'
import { Navbar } from '@/components'
import { SearchContext } from '@/contexts/SearchContext'
import axios from 'axios'
import { useQuery } from 'react-query'

const baseUrl = 'https://gomarmitaflix.herokuapp.com'

export type MediaFetchContainerProps = {
  searchUrl?: string
}

export default function MediaFetchContainer({ searchUrl }: MediaFetchContainerProps) {
  const [page, setPage] = useState(1)
  const [hasEnded, setHasEnded] = useState(false)
  const [moviesData, setMoviesData] = useState<MoviesModel>([])
  const [oldSearchInput, setOldSearchInput] = useState<string | undefined>(undefined)
  const { searchInput } = useContext(SearchContext)

  const url = useMemo(() => {
    if (searchInput !== oldSearchInput) {
      setMoviesData([])
      setPage(1)
      setOldSearchInput(searchInput)
    }
    if (searchUrl !== '') {
      return `${baseUrl}/movies/search/${searchUrl}/${page}`
    }
    return `${baseUrl}/movies/all/${page}`
  }, [page, searchUrl])

  const { data, isLoading, error } = useQuery(['movies', url], async () => {
    const { data } = await axios.get<MoviesModel>(url)
    if (data === null) {
      setHasEnded(true)
      return data
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
        <MediaGrid movies={moviesData || []} isLoading={isLoading} error={error} onFetchMore={onFetchMore} hasEnded={hasEnded} />
      </main>
    </GlobalContainer>
  )
}