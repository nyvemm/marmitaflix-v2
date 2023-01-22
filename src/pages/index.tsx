import { useEffect, useState } from 'react'

import MediaFetchContainer from '@/containers/MediaFetchContainer'
import { SearchContext } from '@/contexts/SearchContext'

export default function Home() {
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    const search = url.searchParams.get('s')
    if (search) {
      setSearchInput(search)
    }
  }, [])

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      <MediaFetchContainer searchUrl={searchInput} />
    </SearchContext.Provider>
  )
}
