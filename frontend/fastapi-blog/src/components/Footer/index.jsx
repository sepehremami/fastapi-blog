import React from 'react';

function Footer() {

  return (
      <footer className="text-left">

          <div
              className="grid md:grid-cols-5 sm:grid-cols-3 flex border-t border-primary bg-gradient-to-t from-slate-900 to-secondary-2 text-slate-300 p-20">
              <div className="col-span-3 ">
                  <h4 className="lg:text-5xl md:text-3xl text-xl font-semibold">Blog</h4>
                  <p className="text-slate-500 font-light lg:text-xl mt-4 pr-4 pb-4 ">paragraph paragraph paragraph
                      paragraph paragraph paragraph paragraph paragraph paragraph
                      paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                      paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph</p>
              </div>
              <div className="md:col-span-2 sm:col-span-3">

                  {/*<div*/}
                  {/*    className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">*/}
                  {/*    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5>*/}
                  {/*    <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and move*/}
                  {/*        work forward with Flowbite on iOS & Android. Download the app today.</p>*/}
                  {/*    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">*/}
                  {/*        <a href="#"*/}
                  {/*           className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">*/}
                  {/*            <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab"*/}
                  {/*                 data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg"*/}
                  {/*                 viewBox="0 0 384 512">*/}
                  {/*                <path fill="currentColor"*/}
                  {/*                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>*/}
                  {/*            </svg>*/}
                  {/*            <div className="text-left">*/}
                  {/*                <div className="mb-1 text-xs">Download on the</div>*/}
                  {/*                <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>*/}
                  {/*            </div>*/}
                  {/*        </a>*/}
                  {/*        <a href="#"*/}
                  {/*           className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">*/}
                  {/*            <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab"*/}
                  {/*                 data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg"*/}
                  {/*                 viewBox="0 0 512 512">*/}
                  {/*                <path fill="currentColor"*/}
                  {/*                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>*/}
                  {/*            </svg>*/}
                  {/*            <div className="text-left">*/}
                  {/*                <div className="mb-1 text-xs">Get in on</div>*/}
                  {/*                <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>*/}
                  {/*            </div>*/}
                  {/*        </a>*/}
                  {/*    </div>*/}
                  {/*</div>*/}

              </div>
          </div>

          <div className="flex justify-between bg-secondary-1 dark:bg-secondary-1 px-20 border-t border-secondary-3 ">
              <div className="py-4"><p className="text-slate-200">All rights reserved for Maktab_Group_3 @2001-2023</p>
              </div>
              {/*<div className=" ">*/}
              {/*    <div className="hidden w-full md:block md:w-auto">*/}
              {/*        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-secondary-1  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">*/}
              {/*            <li>*/}
              {/*                <a href="#"*/}
              {/*                   className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white"*/}
              {/*                   aria-current="page">Home</a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a href="#"*/}
              {/*                   className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a href="#"*/}
              {/*                   className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a href="#"*/}
              {/*                   className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*                <a href="#"*/}
              {/*                   className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>*/}
              {/*            </li>*/}
              {/*        </ul>*/}
              {/*    </div>*/}
              {/*</div>*/}
          </div>

      </footer>
  );
}

export default Footer;
