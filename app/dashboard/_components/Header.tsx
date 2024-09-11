'use client';
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '@/public/logo.png'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

function Header() {

  const path = usePathname();
  useEffect(() => {

  })

  return (
    <div className='flex p-4 items-center bg-black text-white justify-between  shadow-md'>
      <Link href="/">
        <Image src={logo} alt="Logo"></Image>
      </Link>
      <ul className='hidden md:flex gap-6'>
        <li className={`cursor-pointer ${path == "/dashboard" && 'text-slate-800 font-bold'}`}>Dashboard</li>
        <li className={`cursor-pointer ${path == "/questions" && 'text-slate-800 font-bold'}`}>Questions</li>
        <li className={`cursor-pointer ${path == "/upgrade" && 'text-slate-800 font-bold'}`}>Upgrade</li>
        <li className={`cursor-pointer ${path == "/how" && 'text-slate-800 font-bold'}`}>How it Works?</li>

      </ul>
      <UserButton />
    </div>
  )
}

export default Header