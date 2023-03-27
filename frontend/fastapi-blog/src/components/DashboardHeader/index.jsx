import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FastAPIClient from '../../client';
import config from '../../config';
import jwtDecode from "jwt-decode";
import * as moment from "moment";

const client = new FastAPIClient(config);

function DashboardHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // STATE WHICH WE WILL USE TO TOGGLE THE MENU ON HAMBURGER BUTTON PRESS
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const tokenString = localStorage.getItem("token")
	if (tokenString) {
        const token = JSON.parse(tokenString)
        const decodedAccessToken = jwtDecode(token.access_token)
        if(moment.unix(decodedAccessToken.exp).toDate() > new Date()){
            setIsLoggedIn(true)
        }
    }
  }, [])

  const isSuperUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      if (user['is_superuser'] == true){
        return true
      } else{
        return false
      } 
    } else {
      return false
    }
   
  }

  const handleLogout = () => {
    client.logout();
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleLogin = () => {
    navigate("/login");
  }

  let displayButton;
  const buttonStyle = "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"

  if (isLoggedIn) {
      displayButton = <li className="border-t-sky-800 border-r-blue-600 border-b-sky-400 border-l-sky-300 transition ease-out duration-150 md:hover:bg-sky-700 md:hover:border-sky-700 md:border rounded-2xl p-2.5 -my-2.5 px-10">
                      <button onClick={handleLogout}
                              className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                           <p className="text-center">LogOut</p></button>
                      </li>;
    } else {
      displayButton = <li className="border-t-sky-800 border-r-blue-600 border-b-sky-400 border-l-sky-300 transition ease-out duration-150 md:hover:bg-sky-700 md:hover:border-sky-700 md:border rounded-2xl p-2.5 -my-2.5 px-10">
                      <button onClick={handleLogin}
                              className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                           <p className="text-center">JOIN US</p></button>
                      </li>;
    }

  

  return (
      <div>
      {/*    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">*/}
      {/*  <div className="flex items-center flex-shrink-0 text-white mr-6">*/}
      {/*      <span className="font-semibold text-xl tracking-tight">FastBlog - A Project</span>*/}

      {/*  </div>*/}
      {/*  <div className="block lg:hidden">*/}

      {/*  <button*/}
      {/*      className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"*/}
      {/*      onClick={() => setToggleMenu(!toggleMenu)}>*/}

      {/*  </button>*/}

      {/*  </div>*/}


      {/*  <div className={`animate-fade-in-down w-full ${toggleMenu ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>*/}
      {/*      <div className="text-sm align-middle lg:flex-grow">*/}
      {/*          <a href={"http://0.0.0.0:8000/docs"} target={"_blank"} rel={"noreferrer"}*/}
      {/*              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">*/}
      {/*              API Docs*/}
      {/*          </a>*/}

      {/*          <Link to="/"*/}
      {/*              className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">*/}
      {/*              Home*/}
      {/*          </Link>*/}

      {/*          {!isLoggedIn && <Link*/}
      {/*              className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"*/}
      {/*              to={`/sign-up`}>*/}
      {/*              Create Account*/}
      {/*          </Link>}*/}


      {/*          {isLoggedIn && <Link*/}
      {/*              className="blockmr-5 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"*/}
      {/*              to={`/make-post`}>*/}
      {/*              Create Post*/}
      {/*          </Link>}*/}


      {/*          {isSuperUser() && <Link to={'/posts'}*/}
      {/*              className='block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4'>*/}
      {/*              All Posts*/}
      {/*          </Link>}*/}

      {/*          {isLoggedIn && <Link*/}
      {/*              className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"*/}
      {/*              to={`/auth/me`}>*/}
      {/*              View Profile*/}
      {/*          </Link>}*/}

      {/*      </div>*/}
      {/*      <div>*/}
      {/*        {displayButton}*/}
      {/*      </div>*/}
      {/*  </div>*/}


      {/*</nav>*/}



          <nav className="bg-primary border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
              <div className={`container flex flex-wrap items-center justify-between mx-auto `} >

                  <Link to="/" className="flex items-center">
                      <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9"
                           alt="Flowbite Logo"/>
                      <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Weblog</span>
                  </Link>

                  <button onClick={() => setToggleMenu(!toggleMenu)}
                          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">

                      <span className="sr-only">Open main menu</span>

                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                      </svg>

                  </button>
                  <div className={`w-full md:block md:w-auto ${toggleMenu ? "block" : "hidden"} animate-fade-in-down duration-1000`} id="navbar-default">
                      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-primary  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          <li>
                              <Link to="/"
                                 className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent text-slate-900 md:p-0 dark:text-white font-bold"
                                 aria-current="page">Home</Link>
                          </li>
                          <li>
                              <a href="http://0.0.0.0:8000/docs"  target={"_blank"} rel={"noreferrer"}
                                 className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Api Docs</a>
                          </li>
                          <li>
                              <Link to="/about"
                                 className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
                          </li>

                          {isLoggedIn && <li>
                              <Link to="/make-post"
                                    className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create Post</Link>
                          </li>}

                          {isSuperUser() && <li>
                              <Link to="/posts"
                                    className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">All Posts</Link>
                          </li>}


                          {displayButton}

                          {isLoggedIn && <li className="border-t-sky-800 border-r-blue-600 border-b-sky-400 border-l-sky-300 transition ease-out duration-150 md:hover:bg-sky-700 md:hover:border-sky-700 md:border rounded-2xl p-2.5 -my-2.5 px-10">
                              <Link to="/profile"
                                    className="block py-2 pl-3 pr-4 md:text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                  <p className="text-center">View Profile</p></Link>
                          </li>}


                      </ul>
                  </div>
              </div>
          </nav>

      </div>

  );
}

export default DashboardHeader;
