import { Categories, Category } from '@/models'
import { useEffect, useState } from 'react'

import MediaFetchContainer from '@/containers/MediaFetchContainer'
import { Modal } from '@/components'
import { ModalContext } from '@/contexts/ModalContext'
import { SearchContext } from '@/contexts/SearchContext'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [searchInput, setSearchInput] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('filmes' as Category)

  useEffect(() => {
    const url = new URL(window.location.href)
    const search = url.searchParams.get('s')
    const slugQuery = url.searchParams.get('q')
    if (search) {
      setSearchInput(search)
    }
    if (slugQuery) {
      setSlug(slugQuery)
    }
  }, [])

  const toggleModal = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('q')
    window.history.pushState({}, '', url.toString())
    setSlug('')
  }

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      <ModalContext.Provider value={{ slug, setSlug }}>
        <Toaster />
        <MediaFetchContainer searchUrl={searchInput} />
        <Modal isOpen={slug !== ''} toggleModal={() => toggleModal()} slug={slug} />
      </ModalContext.Provider>
    </SearchContext.Provider>
  )
}
