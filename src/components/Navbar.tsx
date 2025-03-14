"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='flex items-center justify-between px-4 md:px-12 py-2 fixed top-0 w-full z-50 shadow bg-white'>
      <Link href={'/'}>
        <Image src={'/logo.png'} alt='Logo' width={100} height={40} />
      </Link>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <Link href={'/'} className="mr-5 text-gray-900 hover:text-gray-700">Home</Link>
        <Link href={'/products'} className="mr-5 text-gray-900 hover:text-gray-700">Products</Link>
      </nav>
      <div className="flex items-center space-x-2.5 text-sm">
        <Link href={'/shopping-cart'}>
          <button className='button bg-transparent text-black border-1 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white'>
            MY BAG
          </button>
        </Link>
      </div>
    </header>
  )
}
