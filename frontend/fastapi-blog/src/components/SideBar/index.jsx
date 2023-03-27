import React, {useState} from "react";
import {Link} from "react-router-dom";




const sideBar = ({menu}) => {

    const [activeLink, setActiveLink] = useState("/" + menu);
    const [toggleMenu, setToggleMenu] = useState(false);


    const handleActiveLink = (path) => {
        setActiveLink(path);
    }

  return(
      <div>
          <div className={`col-span-1 md:h-full h-1300 w-full bg-slate-200 dark:bg-gradient-to-t dark:from-slate-900 dark:to-secondary-2 ${toggleMenu ? "hidden" : "block"}`} id="menu1" >
              <div className="md:col-span-1 md:flex md:justify-end">
                  <nav className="text-right">
                      <div
                          className="flex justify-between items-center border-b border-gray-100 dark:border-primary w-full">
                          <h1 className="font-bold uppercase p-4  ">
                              <p className="dark:text-slate-200">Profile</p>
                          </h1>
                          <button className="px-4 cursor-pointer md:hidden" onClick={() => setToggleMenu(!toggleMenu)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                   strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                              </svg>
                          </button>
                      </div>

                      <ul className="text-sm mt-6 ">
                          <li onClick={() => handleActiveLink("/profile")} className={activeLink === '/profile' ? 'text-gray-700 dark:text-gray-100 uppercase py-1 hover:bg-gray-200 dark:hover:bg-primary transition ease-out duration-500' : 'py-1 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-primary transition ease-out duration-500   hover:border-gray-400'}>
                              <Link to="/profile" className="px-4 flex justify-end " >
                                  <span>MY PROFILE</span>
                                  <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                  </svg>

                              </Link>
                          </li>
                          <li  onClick={() => handleActiveLink("/my-posts")} className={activeLink === '/my-posts' ? 'text-gray-700 dark:text-gray-100 uppercase py-1 hover:bg-gray-200 dark:hover:bg-primary transition ease-out duration-500' : 'py-1 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-primary transition ease-out duration-500   hover:border-gray-400'}>
                              <Link to="/my-posts" className="px-4 flex justify-end  " >
                                  <span>MY Posts</span>
                                  <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                  </svg>

                              </Link>
                          </li>
                          <li onClick={() => handleActiveLink("/setting")} className={activeLink === '/setting' ? 'text-gray-700 dark:text-gray-100 uppercase py-1 hover:bg-gray-200 dark:hover:bg-primary transition ease-out duration-500' : 'py-1 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-primary transition ease-out duration-500   hover:border-gray-400'}>
                              <Link to="#" className="px-4 flex justify-end " >
                                  <span>Setting</span>
                                  <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                       viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                                  </svg>

                              </Link>
                          </li>
                      </ul>
                  </nav>
              </div>

          </div>
          <button className={`p-4 cursor-pointer dark:text-slate-200 ${toggleMenu ? "block" : "hidden"}`} id="burger2" onClick={() => setToggleMenu(!toggleMenu)} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
          </button>
      </div>
  )
}
export default sideBar;