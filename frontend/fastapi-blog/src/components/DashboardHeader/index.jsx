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
      displayButton = <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>;
    } else {
      displayButton = <button className={buttonStyle} onClick={() => handleLogin()}>Login</button>;
    }

  

  return (
      <nav className="bg-primary border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">FastBlog - A Project</span>

        </div>
        <div className="block lg:hidden">

        <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setToggleMenu(!toggleMenu)}>
            
        </button>

        </div>


        <div className={`animate-fade-in-down w-full ${toggleMenu ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm align-middle lg:flex-grow">
                <a href={"http://0.0.0.0:8000/docs"} target={"_blank"} rel={"noreferrer"}
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    API Docs
                </a>

                <Link to="/"
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    Home
                </Link>

                {!isLoggedIn && <Link
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"
                    to={`/sign-up`}>
                    Create Account
                </Link>}


                {isLoggedIn && <Link
                    className="blockmr-5 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"
                    to={`/make-post`}>
                    Create Post
                </Link>}


                {isSuperUser() && <Link to={'posts'}
                    className='block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4'>
                    All Posts
                </Link>}

                {isLoggedIn && <Link
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4"
                    to={`/auth/me`}>
                    View Profile
                </Link>}

            </div>
            <div>
              {displayButton}
            </div>
        </div>


      </nav>
  );
}

export default DashboardHeader;
