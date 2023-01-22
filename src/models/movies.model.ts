export type MovieModel = {
  title: string
  slug: string
  image: string
}

export type MoviesModel = MovieModel[]

export const nullMovies: MoviesModel = []
