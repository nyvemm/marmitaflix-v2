import { createContext } from 'react'

export const ModalContext = createContext({
  slug: '',
  setSlug: (value: string) => {},
})
