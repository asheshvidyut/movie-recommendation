import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MovieCarousel from "@/components/MovieCarousel";
import {
  getUpcomingMovies,
  getTopRatedMovies,
  getPopularMovies
} from "@/lib/getMovies";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="">
      {/* @ts-expect-error Server Component */}
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MovieCarousel
          movies={...upcomingMovies} // eslint-disable-line
          title="Upcoming"
        />
        <MovieCarousel
          movies={...topRatedMovies}
          title="Top Rated"
        />
        <MovieCarousel
          movies={...popularMovies}
          title="Popular"
        />
      </div>
    </main>
  );
}
