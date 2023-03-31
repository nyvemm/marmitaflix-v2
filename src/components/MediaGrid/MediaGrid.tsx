import * as S from './MediaGrid.styled'

import { useContext, useEffect, useRef, useState } from 'react'

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator'
import { ModalContext } from '@/contexts/ModalContext'
import { MoviesModel } from '@/models'
import PullToRefresh from 'react-simple-pull-to-refresh'

export type MediaGridProps = {
  movies: MoviesModel
  isLoading: boolean
  error: unknown
  onFetchMore: () => void
  hasEnded: boolean
}

export const MediaGrid = ({ movies, isLoading, onFetchMore }: MediaGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setSlug } = useContext(ModalContext)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollHeight, clientHeight, scrollTop } = containerRef.current
      console.log(scrollHeight - clientHeight, scrollTop - 200)
      if (scrollHeight - clientHeight <= scrollTop) {
        if (!isLoading) {
          onFetchMore()
        }
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef?.current?.removeEventListener('scroll', handleScroll)
  }, [isLoading, onFetchMore])

  const onPressItem = (slug: string) => {
    setSlug(slug)
    window.history.pushState(null, '', `?q=${slug}`)
  }

  const handleRefresh = async () => {
    window.location.reload()
  }

  if (movies.length === 0) return <ActivityIndicator withContainer />

  return (
    <PullToRefresh onRefresh={handleRefresh} resistance={2} pullingContent={<></>}>
      <S.MediaGridContainer ref={containerRef} id="media-grid">
        {movies.map((movie) => (
          <S.MediaGridItem
            key={movie.title}
            src={movie.image}
            loading="lazy"
            onClick={() => onPressItem(movie.slug)}
            onError={(e) => e.currentTarget.remove()}
          />
        ))}
        {isLoading && <ActivityIndicator />}
      </S.MediaGridContainer>
    </PullToRefresh>
  )
}
