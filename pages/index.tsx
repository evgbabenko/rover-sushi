import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Hero from '../components/Hero';
import Header from '../components/Header';
import { Tab } from '@headlessui/react';
import { fetchCategories } from '../utils/fetchCategories';
import { fetchProducts } from '../utils/fetchProducts';
import Product from '../components/Product';
import Basket from '../components/Basket';
import { Category } from '../typings';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

const Home = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category?._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />);
    //filter products by category
  };

  return (
    <div className='mx-auto min-h-screen'>
      <Head>
        <title>Ровер-Суші</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Basket />
      <main className='relative h-[200vh] bg-[#e7ecee]'>
        <Hero />
        <section className='relative z-40  min-h-screen bg-[#1b1b1b]' id="menu">
          <div className='space-y-10 py-16'>
            <h1 className='text-center text-4xl font-medium tracking-wide text-white'>
              Меню
            </h1>
            {/* Tabs */}
            <Tab.Group>
              <Tab.List className='flex flex-wrap space-x-0 md:flex md:flex-wrap lg:flex-nowrap justify-center'>
                {/* categories tab */}
                {categories
                  .sort((a, b) => a.id - b.id)
                  .map((category) => (
                    <Tab
                      key={category._id}
                      id={category._id}
                      className={({ selected }) =>
                        `whitespace-nowrap rounded-t-lg py-3 text-sm font-light outline-none md:py-4 px-4 md:text-base 
                      ${
                        selected
                          ? 'broderGradient bg-[#35383c] font-bold text-white'
                          : 'border-b-2 border-[#35383c] text-[#747474]'
                      }`
                      }
                    >
                      {category.title}
                    </Tab>
                  ))}
              </Tab.List>

              <Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 px-4'>
                {/* show products */}
                {categories.map((item, index) => (
                  <Tab.Panel className='tabPanel' key={`tab-${item._id}`}>
                    {showProducts(index)}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

//Backend code
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
