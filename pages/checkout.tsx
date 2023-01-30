/* Default currency, Delivery Cost, min order total for free delivery - check ../constants/constants */

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import CheckoutProducts from '../components/CheckoutProducts';
import { Currency } from '../utils/currencyFormatter';
import {
  defaultCurrency,
  deliveryCost,
  freeDelivery,
} from '../constants/constants';
import Stripe from 'stripe';
import { fetchPostJSon } from '../utils/api-helpers';
import getStripe from '../utils/get-Stripejs';
import { Product } from '../typings';

const Checkout = () => {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

  const [loading, setLoading] = useState(false);
  const basketTotal = useSelector(selectBasketTotal);

  /* Stripe checkout session */
  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSon(
      '/api/checkout_sessions',
      {
        items: items,
      }
    );

    //Internal server error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return;
    }

    //Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
      //Make the field from the Checkout Session creation API response
      //available to this file, so you can provide it as parameter here
      //instead of the {{CHECKOUT_SESSION_ID}} placeholder 
    });

    console.warn(error.message);
    //If 'redirectToCheckout' fails dur to a browser or network
    //error, display the localized error to your customer
    //using 'error.message'

    setLoading(false);
  };

  // group all items by _id
  // check if item (by item._id) in array of items:
  // if yes -
  // if no - add new item
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
      <Head>
        <title>Оплата - Ровер-Суші</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24'>
        <div className='px-5'>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? 'Ваше замовлення:' : 'Ваше замовлення пусте'}
          </h1>
          <p className='my-4'>{/* delivery */}</p>
          {items.length === 0 && (
            <Button
              title='Продовжити покупки'
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {/* products section */}
        {items.length > 0 && (
          <div className='mx-5 md:mx-8 '>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProducts key={key} items={items} id={key} />
            ))}
            {/* total section */}
            <div className='my-12 ml-auto mt-6 max-w-3xl '>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Сума замовлення</p>
                    <p>{Currency(basketTotal, defaultCurrency)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Доставка</p>
                    <p>
                      {basketTotal < freeDelivery
                        ? Currency(deliveryCost, defaultCurrency)
                        : 'Безкоштовно'}
                    </p>
                  </div>
                </div>
                {/* total */}
                <div className='flex justify-between pt-4 text-xl'>
                  <p className='font-semibold'>Всього: </p>
                  <p className='text-lg font-semibold text-red-500'>
                    {Currency(
                      basketTotal +
                        (basketTotal < freeDelivery ? deliveryCost : 0),
                      defaultCurrency
                    )}
                  </p>
                </div>
                {/* end tital */}
              </div>
              {/* payment section */}
              <div className='my-14 space-y-4'>
                <h4 className='text-xl font-semibold'>Варіанти оплати:</h4>

                <div className='flex flex-col gap-4 md:flex-row'>
                  {/* payment card */}
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Оплата карткою на сайті
                      <span className='text-base'>
                        {Currency(
                          basketTotal +
                            (basketTotal < freeDelivery ? deliveryCost : 0),
                          defaultCurrency
                        )}
                      </span>
                    </h4>
                    <Button
                      title={'Сплатити карткою на сайті зараз'}
                      width='w-full'
                      onClick={createCheckoutSession}
                      loading={loading}
                    />
                  </div>
                  {/* payment card */}
                  <div className='flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center md:order-2'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Оплата готівкою при отриманні
                      <span className='text-base'>
                        {Currency(
                          basketTotal +
                            (basketTotal < freeDelivery ? deliveryCost : 0),
                          defaultCurrency
                        )}
                      </span>
                    </h4>
                    <Button
                      title={'Сплатити готівкою при отриманні'}
                      width='w-full'
                    />
                  </div>
                </div>
              </div>
              {/* end payment section */}
            </div>
          </div>
        )}

        {/*  */}

        {/*  */}
      </main>
    </div>
  );
};

export default Checkout;
