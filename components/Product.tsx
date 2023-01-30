import Image from 'next/image';
import React from 'react';
import { urlFor } from '../sanity';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/basketSlice';
import  toast  from 'react-hot-toast';
import CustomToast from './CustomToast';
import { Currency } from '../utils/currencyFormatter';
import { defaultCurrency } from '../constants/constants';
import { Product } from '../typings';

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));
    { CustomToast(product, 'add') }
  };

  return (
    <div className='relative flex h-fit w-full shrink-0 select-none flex-col justify-end space-y-3 rounded-xl bg-[#35383e] p-3 shadow-md shadow-gray-700 md:h-[500px] md:w-[400px] md:p-3'>
      <div className='relative !h-64 w-full'>
        <Image
          src={urlFor(product.image[0]).url()}
          alt=''
          fill
          objectFit='cover'
          className='overflow-hidden rounded-xl'
        />
      </div>
      <div>
        <div className='flex flex-col items-start text-sm text-[gray]'>
          <p>{product.description}</p>
          <p>{product.weight} г.</p>
        </div>
      </div>

      <div className='flex flex-1 items-end justify-between space-x-3'>
        <div className='space-y-2 text-xl text-white'>
          <p>{product.title}</p>
          <div>
            {product.sale ? (
              <div className='flex flex-row items-center justify-between'>
                <div className='saleprice'>
                  {Currency(product.price, defaultCurrency)}
                </div>
                <div>{Currency(product.salePrice, defaultCurrency)}</div>
              </div>
            ) : (
              <div>{Currency(product.price, defaultCurrency)}</div>
            )}
          </div>
        </div>

        <div
          className='flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white hover:text-red-600 md:h-[45px] md:w-[45px]'
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className='h-6 w-6 cursor-pointer ' />
        </div>
      </div>
    </div>
  );
};

export default Product;
