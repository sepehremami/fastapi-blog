import DashboardHeader from "../DashboardHeader";
import Footer from "../Footer";
import FastAPIClient from "../../client";
import config from "../../config";
import SideBar from "../SideBar";
import {useState} from "react";
import ImageViewer from "../Image/image";



const Profile = () => {



    const client = new FastAPIClient(config);
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);



    console.log(user)

  return(
      <div className={"font-body bg-slate-200 dark:bg-gradient-to-b dark:from-secondary-1 dark:to-primary"}>
          <DashboardHeader/>
          <main className="grid grid-cols-5 ">
              <SideBar menu={"profile"}/>

              <div className="container mx-auto my-5 p-5 col-span-4">
                  <div className="md:flex no-wrap md:-mx-2 ">
                      <div className="w-full md:w-3/12 md:mx-2">
                          <div className="dark:bg-slate-900 bg-white p-3 border-t-4 border-green-400">
                              <div className="image overflow-hidden">
                                  <img className="h-auto w-full mx-auto"
                                       src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                       alt=""/>
                              </div>
                                <ImageViewer />
                              {user && (<h1
                                  className="text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 my-1">{user.username}</h1>)}
                              
                              
                              <ul
                                  className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                  <li className="flex items-center py-3">
                                      <span>Status</span>
                                      <span className="ml-auto"><span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                  </li>
                                  <li className="flex items-center py-3">
                                      <span>Member since</span>
                                      <span className="ml-auto">{user.created_at.slice(0,10)}</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="my-4"></div>
                       
                        
                      </div>
                      <div className="w-full md:w-9/12 mx-2 h-64">
                          <div className="bg-white dark:bg-slate-900 p-3 shadow-sm rounded-sm">
                              <div
                                  className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </span>
                                  <span className="tracking-wide">About</span>
                              </div>
                              <div className="text-gray-700 dark:text-gray-200">
                                  <div className="grid md:grid-cols-2 text-sm">
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">username</div>
                                          <div className="px-4 py-2">{user.username}</div>
                                      </div>
                                    
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Contact No.</div>
                                          <div className="px-4 py-2">{user.phone}</div>
                                      </div>
                                   
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Email.</div>
                                          <div className="px-4 py-2">
                                              <a className="text-blue-800"
                                                  href="mailto:jane@example.com">{user.email}</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                        
                          </div>

                          <div className="my-4"></div>
                      </div>
                  </div>
              </div>

          </main>

          <Footer/>
      </div>
  )
}
export default Profile;