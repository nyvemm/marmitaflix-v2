import { Category } from '@/models'
import { createContext } from 'react'

export const CategoryContext = createContext({
  category: 'all' as Category,
  setCategory: (value: Category) => {},
})
