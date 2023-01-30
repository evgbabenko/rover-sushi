//Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //get session id
  const sessionId = req.query.session_id as string;

  //list line items
  const session = await stripe.checkout.sessions.listLineItems(sessionId);

  res.status(200).json({
    session,
  });
}