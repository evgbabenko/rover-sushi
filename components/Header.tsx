import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../redux/basketSlice';
import { menu } from '../constants/constants';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);

  return (
    <header className='sticky top-0 z-[100] flex items-center justify-between bg-[#e7ecee] p-2'>
      <div className='flex items-center justify-center md:w-1/5'>
        {/* Logo */}
        <Link href='/'>
          <div className='relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100'>
            <Image src='https://rb.gy/vsvv2o' alt='' fill objectFit='contain' />
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className='items-centrer hidden flex-1 justify-center space-x-8 md:flex'>
        <a href='/#menu' className='headerlink'>
          {menu.menu}
        </a>
        <a href='' className='headerlink'>
          {menu.delivery}
        </a>
        <a href='' className='headerlink'>
          {menu.support}
        </a>
        <a href='' className='headerlink'>
          {menu.about}
        </a>
      </div>

      {/* Icons */}
      <div className='md:w1/5 flex items-center justify-center gap-x-4'>
        <SearchIcon className='headerIcon' />

        <Link href='/checkout'>
          <div className='cursor-pionter relative'>
            {items.length > 0 && (
              <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-yellow-400 text-[10px] text-white'>
                {items.length}
              </span>
            )}
            <ShoppingBagIcon className='headerIcon' />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              ''
            }
            alt=''
            width={34}
            height={34}
            className='cursor-pointer rounded-full'
            onClick={()=>signOut()}
          />
        ) : (
          <UserIcon
            className='headerIcon'
            onClick={()=>signIn()}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
