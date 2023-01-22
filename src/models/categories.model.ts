export type Category = 'all' | 'movies' | 'shows' | 'animes'

export type Categories = Category[]

export const nullCategories: Categories = []

export const defaultCategories: Categories = ['all', 'movies', 'shows', 'animes']
