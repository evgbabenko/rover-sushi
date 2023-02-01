import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  defaultCurrency,
  deliveryCost,
  dialog,
  freeDelivery,
  order_status,
} from '../constants/constants';
import Button from '../components/Button';
import { useMediaQuery } from 'react-responsive';
import { Currency } from '../utils/currencyFormatter';
import { GetServerSideProps } from 'next';
import { StripeProduct } from '../typings';
import { fetchLineItems } from '../utils/fetchLineItems';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface Props {
  products: StripeProduct[];
}

const Success = ({ products }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subTotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );

  useEffect(() => {
    setMounted(true);
  });

  //showOrderSummary always true for desctop but only conditionally true for mobule
  const isTableOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const showSummary = isTableOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
  return (
    <div className='mx-auto '>
      <Head>
        <title>Дякуємо - Ровер-Суші</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main className='grid grid-cols-1 lg:grid-cols-9'>
        <section className='order-2 mx-auto max-w-xl p-2 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-14'>
          <Link href=''></Link>

          <div className='my-8 flex space-x-4 lg:ml-14 xl:ml-0'>
            <div>
              <CheckIcon className='flex h-11 w-11 items-center justify-center rounded-full border border-black' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                {dialog.order_no} {session_id?.slice(-5)}
              </p>
              <h4 className='text-lg'>
                {dialog.thanks}{' '}
                {session ? session.user?.name?.split(' ')[0] : 'Guest'}
              </h4>
            </div>
          </div>

          <div className='divide-y divide-gray-300 rounded-md border border-gray-300 p-3'>
            <div className='space-y-2 pb-3'>
              <p>{dialog.order_confirmed}</p>
              <p>{dialog.order_accepted}</p>
            </div>
            <div className='text_sm pt-3'>
              <p className='pb-3 font-medium text-gray-500'>
                {dialog.order_status}
              </p>
              <div className='flex flex-col items-start justify-between space-y-3 lg:flex-row lg:items-center lg:space-y-0 xl:flex-row xl:items-center xl:space-y-0'>
                <div className='flex flex-row items-center justify-center space-x-3'>
                  <CheckIcon
                    className={`flex h-5 w-5 rounded-full border border-black`}
                  />
                  <p>{order_status.accepted}</p>
                </div>
                <div className='flex flex-row items-center justify-center space-x-3'>
                  <CheckIcon
                    className={`flex h-5 w-5 rounded-full border border-black`}
                  />
                  <p>{order_status.in_process}</p>
                </div>
                <div className='flex flex-row items-center justify-center space-x-3'>
                  <CheckIcon
                    className={`flex h-5 w-5 rounded-full border border-black`}
                  />
                  <p>{order_status.ready}</p>
                </div>
                <div className='flex flex-row items-center justify-center space-x-3'>
                  <CheckIcon
                    className={`flex h-5 w-5 rounded-full border border-black`}
                  />
                  <p>{order_status.issued_for_delivery}</p>
                </div>
                <div className='flex flex-row items-center justify-center space-x-3'>
                  <CheckIcon
                    className={`flex h-5 w-5 rounded-full border border-black`}
                  />
                  <p>{order_status.delivered}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
            <p className='hidden lg:inline'>{dialog.help_needed}</p>
            {mounted && (
              <Button
                title={dialog.continueShopping}
                onClick={() => router.push('/')}
                width={isTableOrMobile ? 'w-full' : undefined}
                padding='py-4'
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className='order-2 border-y border-l border-gray-300 bg-[#FAFAFA] lg:col-span-4 lg:h-screen lg:border-y-0'>
            <div
              className={`w-full ${
                showSummary && 'border-b'
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                <button
                  onClick={handleShowOrderSummary}
                  className='flex items-center space-x-2 '
                >
                  <ShoppingCartIcon className='h-4 w-4' />
                  <p>{dialog.show_order_summary}</p>
                  {showSummary ? (
                    <ChevronUpIcon className='h-4 w-4' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4' />
                  )}
                </button>
                <p className='text-xl font-medium text-black'>
                  {Currency(
                    subTotal + (subTotal < freeDelivery ? deliveryCost : 0),
                    defaultCurrency
                  )}
                </p>
              </div>
            </div>

            {showSummary && (
              <div className='devide-y mx-auto max-w-xl border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                <div className='space-y-4 pb-4'>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className='flex items-center space-x-4 font-medium'
                    >
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white'>
                        <div className='relative h-6 w-6 animate-bounce rounded-md '>
                          <Image
                            src='http://localhost:3000/_next/image?url=https%3A%2F%2Frb.gy%2Fvsvv2o&w=640&q=75'
                            alt=''
                            fill
                            objectFit='contain'
                          />
                        </div>
                        <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs'>
                          {product.quantity}
                        </div>
                      </div>
                      <p className='flex-1 text-sm'>{product.description}</p>
                      <p className='text-sm'>
                        {Currency(
                          product.price.unit_amount / 100,
                          defaultCurrency
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>{dialog.subtotal}</p>
                    <p className='font-medium text-[gray]'>
                      {Currency(subTotal, defaultCurrency)}
                    </p>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>{dialog.delivery}</p>
                    <p className='font-medium text-[gray]'>
                      {Currency(
                        subTotal < freeDelivery ? deliveryCost : 0,
                        defaultCurrency
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-sm'>
                  <p className='text-black'>{dialog.total}</p>
                  <p className='font-medium text-black'>
                    {Currency(
                      subTotal + (subTotal < freeDelivery ? deliveryCost : 0),
                      defaultCurrency
                    )}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);
  
  return {
    props: {
      products,
    },
  };
};
