import { StripeCardElementChangeEvent } from "@stripe/stripe-js";

interface Category {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'category';
  slug: {
    _type: 'slug';
    current: string;
  };
  title: string;
  id: number;
}

interface Image{
  _key: string;
  _type: 'image';
  asset: {
    url: string;
  };
}

interface StripeProduct{
  id: string,
  amount_discout: number,
  amount_subtotal: number,
  amount_tax: number,
  amount_total: number,
  currency: string,
  description: string,
  object: string,
  quantity: number,
  images: [],
  price: {
    unit_amount: number,
  }
}

interface Product {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'product';
  title: string;
  price: number;
  sale: boolean;
  salePrice: number;
  weight: string;
  slug: {
    _type: 'product';
    current: string;
  };
  description: string;
  spaicy: boolean;
  vegan: boolean;
  category: {
    _type: 'reference';
    _ref: string;
  };
  image: Image[];
}