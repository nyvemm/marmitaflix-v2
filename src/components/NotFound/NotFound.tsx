import * as S from './NotFound.styled'

import React, { useContext } from 'react'

import { SearchContext } from '@/contexts/SearchContext'

export const NotFound = () => {
  const { searchInput } = useContext(SearchContext)

  return (
    <S.NotFoundContainer>
      <S.NotFoundTitle>Não encontramos resultados para &quot;{searchInput}&quot;</S.NotFoundTitle>
      <S.NotFoundBulletList>
        <S.NotFoundBulletListItem>Tente procurar por palavras-chaves diferentes</S.NotFoundBulletListItem>
        <S.NotFoundBulletListItem>Tente procurar o nome de um filme, série ou anime</S.NotFoundBulletListItem>
        <S.NotFoundBulletListItem>Tente procurar por um gênero, como ação, aventura, comédia, etc</S.NotFoundBulletListItem>
      </S.NotFoundBulletList>
    </S.NotFoundContainer>
  )
}
