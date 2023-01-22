import * as S from './Navbar.styled'

import { useContext, useEffect, useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import { SearchContext } from '@/contexts/SearchContext'

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const { setSearchInput } = useContext(SearchContext)

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchInput(search)

      const url = new URL(window.location.href)
      url.searchParams.set('s', search)
      window.history.pushState({}, '', url.toString())
    }
  }

  const onResetSearch = () => {
    window.location.href = '/'

  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const querySearch = url.searchParams.get('s')
    if (querySearch) {
      setSearch(querySearch)
    }
  }, [])

  return (
    <S.HeaderContainer>
      <S.NavbarContainer>
        <S.NavbarBackground src="/header-background.png" alt="Background" />
        <S.NavbarWrapper>
          <S.NavbarLogo src="/logo.png" alt="Logo" onClick={() => onResetSearch()} />
          <S.NavSearchContainer>
            <S.NavSearchInput
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => onPressEnter(e)}
            />
            <S.NavSearchIcon>{search === '' ? <FiSearch size={20} /> : <FiX size={20} onClick={() => setSearch('')} />}</S.NavSearchIcon>
          </S.NavSearchContainer>
        </S.NavbarWrapper>
      </S.NavbarContainer>
      <S.NavLinksContainer>
        <S.NavLinksItem>Filmes</S.NavLinksItem>
        <S.NavLinksItem>Séries</S.NavLinksItem>
        <S.NavLinksItem>Animes</S.NavLinksItem>
      </S.NavLinksContainer>
    </S.HeaderContainer>
  )
}
