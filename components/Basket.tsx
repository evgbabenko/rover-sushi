import Link from 'next/link';
import React from 'react';
import { selectBasketItems } from '../redux/basketSlice';
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from '@heroicons/react/outline';

const Basket = () => {
  const items = useSelector(selectBasketItems);

  if (items.length === 0) return null;

  return (
    <Link href='/checkout'>
      <div className='fixed  bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gray-500'>
        {items.length > 0 && (
          <span className='absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-yellow-400 text-[16px] text-white'>
            {items.length}
          </span>
        )}
        <ShoppingBagIcon className='headerIcon h-8 w-8 text-white' />
      </div>
    </Link>
  );
};

export default Basket;
