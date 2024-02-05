import MovieCarousel from '@/components/MovieCarousel';
import { getPopularMovies, getSearchedMovie } from '@/lib/getMovies';
import React from 'react'

interface Props {
  params: {
    term: string
  }
}

async function SearchPage({ params: { term } }: Props) {
  const searchTerm = decodeURI(term);

  const movies = await getSearchedMovie(searchTerm)
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {searchTerm}</h1>
        <MovieCarousel title="Movies" movies={movies} isVertical />
        <MovieCarousel title="You may also like" movies={popularMovies} />
      </div>  
    </div>
  )
}

export default SearchPage