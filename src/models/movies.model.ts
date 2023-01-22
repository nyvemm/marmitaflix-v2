export type MovieModel = {
  title: string
  slug: string
  image: string
  description: string
  embed: string
  links: {
    label: string
    link: string
  }[]
}

export type MoviesModel = MovieModel[]

export const nullMovies: MoviesModel = []
