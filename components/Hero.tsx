import Image from 'next/image';
import React from 'react';
import Button from './Button';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  return (
    <section className='sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl'>
          <span className='block bg-gradient-to-b from-blue-600 to-yellow-400 bg-clip-text text-transparent'>
            Смачно
          </span>
          <span className='block'>Сучасно</span>
          <span className='block'>Швидко</span>
        </h1>
        <div className='space-x-8'>
          <Button title='Замовити' onClick={()=>router.push('/#menu')}/>
          <a className='link'>Детальніше</a>
        </div>
      </div>
      <div className='relative hidden h-[450px] w-[450px] overflow-hidden rounded-xl transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]'>
        <Image
          src='/cover.jpg'
          alt=''
          fill
          objectFit='contain'
        />
      </div>
    </section>
  );
};

export default Hero;
