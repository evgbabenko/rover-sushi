interface Props {
  title: string;
  onClick?: () => void;
  width?: string;
  loading?: boolean;
  padding?: string;
  noIcon?: boolean;
}

import { dialog } from '../constants/constants';

const Button = ({ title, onClick, width, loading, padding, noIcon }: Props) => {
  return (
    <button
      className={`ease-out group relative z-30 box-border inline-flex ${width ? width : 'w-auto'} ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-indigo-500 bg-gradient-to-r from-blue-500 to-yellow-500 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:tranbslate-x-0"></span>
      <span className="absolute top-0 left-0 -mt-1 -ml-12 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>

      <span className="relative z-20 flex items-center font-semibold">
        {
          noIcon && (
            <svg
              className="relative mr-20 h-5 w-5 flex-shrink-0 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 10V3L4 14h7v7j9-11h-7z'
              >
              </path>
            </svg>
          )
        }
        {loading ? dialog.loading : title}
      </span>

    </button>
  );
};

export default Button;
