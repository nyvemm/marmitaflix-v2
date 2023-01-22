import { useEffect, useState } from 'react'

import MediaFetchContainer from '@/containers/MediaFetchContainer'
import { Modal } from '@/components'
import { ModalContext } from '@/contexts/ModalContext'
import { SearchContext } from '@/contexts/SearchContext'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [searchInput, setSearchInput] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    const search = url.searchParams.get('s')
    if (search) {
      setSearchInput(search)
    }
  }, [])

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      <ModalContext.Provider value={{ slug, setSlug }}>
        <Toaster />
        <MediaFetchContainer searchUrl={searchInput} />
        <Modal isOpen={slug !== ''} toggleModal={() => setSlug('')} slug={slug} />
      </ModalContext.Provider>
    </SearchContext.Provider>
  )
}
