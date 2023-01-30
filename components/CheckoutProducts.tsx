import Image from 'next/image';
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Currency } from '../utils/currencyFormatter';
import { removeFromBasket } from '../redux/basketSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';
import { defaultCurrency, dialog } from '../constants/constants';
import { Product } from '../typings';

interface Props {
  items: Product[];
  id: string;
}

const CheckoutProducts = ({ items, id }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    {
      CustomToast(items[0], 'remove');
    }

    /*     toast.error(`${items[0].title} видалено з замолвлення`, {
      position: 'bottom-center',
    }); */
  };

  return (
    <div className='mb-5 flex w-full flex-row items-center justify-between gap-x-4 border-b border-gray-300 px-3 '>
      {/* Image */}
      <div className='relative my-3 h-28 w-28 overflow-hidden rounded-xl'>
        <Image
          src={urlFor(items[0].image[0]).url()}
          alt=''
          fill
          objectFit='cover'
        />
      </div>

      {/* Description */}
      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl '>
            <div className='font-semibold lg:w-96'>
              {items[0].title}
              {items[0].sale && (
                <span className='text-sm text-[red]'> - {dialog.sale}</span>
              )}
            </div>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}
              <ChevronDownIcon className='h-6 w-6 text-blue-500' />
            </p>
          </div>

          {/*           <p className='flex cursor-pointer items-center text-blue-500 hover:underline'>
            {dialog.detailed}
            <ChevronDownIcon className='h-4 w-4' />
            
          </p> */}
        </div>
        <div className='flex flex-col items-end justify-end space-y-4'>
          {
            items[0].sale ?
              <h4 className='text-lg font-semibold'>
            {Currency(
              items.reduce(
                (total, item) =>
                  total + item.price,
                0
              ),
              defaultCurrency
            )}
          </h4>: ''
          }
          
          <h4 className='text-lg font-semibold'>
            {Currency(
              items.reduce(
                (total, item) =>
                  item.sale ? total + item.salePrice : total + item.price,
                0
              ),
              defaultCurrency
            )}
          </h4>
          <button
            onClick={removeItemFromBasket}
            className='text-sm text-blue-500 hover:underline'
          >
            {dialog.del_item}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
