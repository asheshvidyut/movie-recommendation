import Link from 'next/link';
import Image from 'next/Image';
import React from 'react'
import { ToggleTheme } from './ToggleTheme';
import SearchInput from './SearchInput';
import GenreDropdown from './GenreDropdown';

type Props = {}

function Header({}: Props) {
  return (
    <header
      className="fixed w-full z-20 top-0 flex items-center justify-between p-5 "
    >
      <Link
        href="/"
        className='mx-5'
      >
        Home
      </Link>
      <div className="flex space-2">
        {/* @ts-expect-error Server Component */}
        <GenreDropdown />
        <SearchInput />
        <ToggleTheme />
      </div>
    </header>
  )
}

export default Header