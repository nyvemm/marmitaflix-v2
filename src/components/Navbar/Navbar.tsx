import * as S from './Navbar.styled'

import { useContext, useEffect, useState } from 'react'

import { Category } from '@/models'
import { CategoryContext } from '@/contexts/CategoryContext'
import { FiSearch } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import { SearchContext } from '@/contexts/SearchContext'

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const { searchInput, setSearchInput } = useContext(SearchContext)
  const { category, setCategory } = useContext(CategoryContext)

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchInput(search)

      const url = new URL(window.location.href)
      url.searchParams.set('s', search)
      window.history.pushState({}, '', url.toString())
    }
  }

  const onResetSearch = () => {
    window.history.pushState({}, '', '/')
    setSearch('')
    setSearchInput('')
    setCategory('all')
    const mediaGrid = document.getElementById('media-grid')
    if (mediaGrid) {
      mediaGrid.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const querySearch = url.searchParams.get('s')
    if (querySearch) {
      setSearch(querySearch)
    }
  }, [])

  const toggleCategory = (newCategory: Category) => {
    if (category === newCategory) {
      setCategory('all')
    } else {
      setCategory(newCategory)
    }
  }

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
      {searchInput === '' && (
        <S.NavLinksContainer>
          <S.NavLinksItem onClick={() => toggleCategory('movies')} selected={category === 'movies'}>
            Filmes
          </S.NavLinksItem>
          <S.NavLinksItem onClick={() => toggleCategory('shows')} selected={category === 'shows'}>
            Séries
          </S.NavLinksItem>
          <S.NavLinksItem onClick={() => toggleCategory('animes')} selected={category === 'animes'}>
            Animes
          </S.NavLinksItem>
        </S.NavLinksContainer>
      )}
    </S.HeaderContainer>
  )
}
