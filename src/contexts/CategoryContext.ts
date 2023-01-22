import { createContext } from 'react'

export const CategoryContext = createContext({
  categoryContext: '',
  setCategoryContext: (value: string) => {},
})
