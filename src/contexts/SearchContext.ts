import { createContext } from 'react'

export const SearchContext = createContext({
  searchInput: '',
  setSearchInput: (value: string) => {},
})
