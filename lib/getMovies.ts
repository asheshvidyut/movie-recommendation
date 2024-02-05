export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24
    }
  }

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as MoviesResponse

  return data;
}

async function getMovies(url: URL) {
  const data = await fetchFromTMDB(url);

  return data.results;
}

const TMDB_HOSTNAME = "https://api.themoviedb.org/3";

export async function getUpcomingMovies() {
  const url = new URL(TMDB_HOSTNAME + "/movie/upcoming")

  return await getMovies(url);
}

export async function getTopRatedMovies() {
  const url = new URL(TMDB_HOSTNAME + "/movie/top_rated")

  return await getMovies(url);
}

export async function getPopularMovies() {
  const url = new URL(TMDB_HOSTNAME + "/movie/popular")

  return await getMovies(url);
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(TMDB_HOSTNAME + "/discover/movie");

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  return await getMovies(url);
}

export async function getSearchedMovie(term: string) {
  const url = new URL(TMDB_HOSTNAME + "/search/movie");

  url.searchParams.set("query", term);

  return await getMovies(url);
}
