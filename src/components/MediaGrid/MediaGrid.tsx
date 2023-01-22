import * as S from './MediaGrid.styled'

import { useEffect, useRef, useState } from 'react'

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator'
import { MoviesModel } from '@/models'

export type MediaGridProps = {
  movies: MoviesModel
  isLoading: boolean
  error: unknown
  onFetchMore: () => void
  hasEnded: boolean
}

export const MediaGrid = ({ movies, isLoading, error, hasEnded, onFetchMore }: MediaGridProps) => {
  const [isFetching, setIsFetching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollHeight, clientHeight, scrollTop } = containerRef.current
      if (scrollHeight - clientHeight <= scrollTop) {
        setIsFetching(true)
        onFetchMore()
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef?.current?.removeEventListener('scroll', handleScroll)
  }, [isLoading, isFetching, onFetchMore])

  useEffect(() => {
    setIsFetching(false)
  }, [movies])

  if (movies.length === 0) return <ActivityIndicator withContainer />

  return (
    <>
      <S.MediaGridContainer ref={containerRef}>
        {movies.map((movie) => (
          <S.MediaGridItem key={movie.title} src={movie.image} alt={movie.title} loading="lazy" />
        ))}
        {/* {isFetching && !hasEnded && <ActivityIndicator />} */}
      </S.MediaGridContainer>
    </>
  )
}
