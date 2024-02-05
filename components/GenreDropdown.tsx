import { ChevronDown } from 'lucide-react';
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from "next/link";

type Props = {}

interface Genre {
  id: string;
  name: string;
}

interface Genres {
  genres: Genre[]
}

async function GenreDropdown({}: Props) {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  const RequestInit = {
    ...options,
    next: {
      revalidate: 60 * 60 * 24
    }
  }

  const response = await fetch(url, options)
  const data = (await response.json()) as Genres;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        Genre <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          Select a Genre
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          data.genres.map(({ id, name }) => {
            return (
              <DropdownMenuItem key={id} className="text-white">
                <Link href={`/genre/${id}?genre=${name}`}>
                  {name}
                </Link>
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default GenreDropdown