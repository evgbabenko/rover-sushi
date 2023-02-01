// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { urlFor } from '../../sanity';
import { current } from '@reduxjs/toolkit';
import {
  defaultCurrency,
  deliveryCost,
  dialog,
  freeDelivery,
} from '../../constants/constants';
import { Product } from '../../typings';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //https:github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const items: Product[] = req.body.items;
    /* get subtotal for free shipping check */
    let subtotal = 0;
    items.map(
      (item) =>
        (subtotal += item.sale ? item.salePrice * 100 : item.price * 100)
    );

    const transformItems = items.map((item) => ({
      price_data: {
        currency: defaultCurrency,
        product_data: {
          name: item.title,
          images: [urlFor(item.image[0]).url()],
        },
        unit_amount: item.sale ? item.salePrice * 100 : item.price * 100,
      },
      quantity: 1,
    }));
    try {
      //Create cherckout session from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['UA'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                /* if subtotal > freedelivery - Free delivery */
                amount: subtotal > freeDelivery ? 0 : deliveryCost * 100,
                currency: defaultCurrency,
              },
              display_name: dialog.delivery,
            },
          },
        ],

        line_items: transformItems,
        payment_intent_data: {},
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          images: JSON.stringify(items.map((item) => item.image[0].asset.url)),
        },
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(checkoutSession);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
