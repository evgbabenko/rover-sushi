import React from 'react';
import toast from 'react-hot-toast';
import { urlFor } from '../sanity';
import { spawn } from 'child_process';
import { dialog } from '../constants/constants';
import { Product } from '../typings';


const CustomToast = (product: Product, action: 'add' | 'remove') => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className='w-0 flex-1 p-4'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 pt-0.5'>
            <img
              className='h-10 w-10 rounded-lg'
              src={urlFor(product.image[0]).url()}
              alt=''
            />
          </div>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-bold text-gray-900'>
              {product.title}{' '}
              <span className='mt-1 text-sm text-gray-500'>
                {action === 'add'
                  ? <span className='text-[green] font-semibold'>{dialog.add_to_order}</span>
                  : <span className='text-[red] font-semibold'>{dialog.remove_from_order}</span>}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default CustomToast;
