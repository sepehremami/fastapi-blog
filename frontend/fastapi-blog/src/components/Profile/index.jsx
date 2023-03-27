import DashboardHeader from "../DashboardHeader";
import Footer from "../Footer";
import FastAPIClient from "../../client";
import config from "../../config";


const client = new FastAPIClient(config);

const user = localStorage.getItem("user");


const Profile = () => {
  return(
      <div className={"font-body bg-slate-200 dark:bg-gradient-to-b dark:from-secondary-1 dark:to-primary"}>
          <DashboardHeader/>
          <main className="grid grid-cols-5 ">
              <div
                  className="col-span-1 h-full w-full bg-slate-200 dark:bg-gradient-to-t dark:from-slate-900 dark:to-secondary-2"
                  id="menu1">
                  <div className="md:col-span-1 md:flex md:justify-end">
                      <nav className="text-right">
                          <div
                              className="flex justify-between items-center border-b border-gray-100 dark:border-primary w-full">
                              <h1 className="font-bold uppercase p-4  ">
                                  <p className="dark:text-slate-200">Profile</p>
                              </h1>
                              <div className="px-4 cursor-pointer md:hidden" id="burger1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                  </svg>
                              </div>
                          </div>

                          <ul className="text-sm mt-6 ">
                              <li className="text-gray-700 dark:text-gray-100 uppercase py-1 hover:bg-gray-200 dark:hover:bg-primary transition ease-out duration-500  ">
                                  <a href="#" className="px-4 flex justify-end ">
                                      <span>MY PROFILE</span>
                                      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                           viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                      </svg>

                                  </a>
                              </li>
                              <li className="py-1 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-primary transition ease-out duration-500   hover:border-gray-400">
                                  <a href="#" className="px-4 flex justify-end  ">
                                      <span>MY Posts</span>
                                      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                           viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                      </svg>

                                  </a>
                              </li>
                              <li className="py-1 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-primary transition ease-out duration-500 hover:border-gray-400">
                                  <a href="#" className="px-4 flex justify-end  ">
                                      <span>Setting</span>
                                      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                           viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                                      </svg>

                                  </a>
                              </li>
                          </ul>
                      </nav>
                  </div>

              </div>
              <div className="p-4 cursor-pointer dark:text-slate-200 hidden" id="burger2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                  </svg>
              </div>

              <div className="container mx-auto my-5 p-5 col-span-4">
                  <div className="md:flex no-wrap md:-mx-2 ">
                      <div className="w-full md:w-3/12 md:mx-2">
                          <div className="dark:bg-slate-900 bg-white p-3 border-t-4 border-green-400">
                              <div className="image overflow-hidden">
                                  <img className="h-auto w-full mx-auto"
                                       src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                       alt=""/>
                              </div>
                              <h1 className="text-gray-900 dark:text-gray-200 font-bold text-xl leading-8 my-1">Jane
                                  Doe</h1>
                              <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company
                                  Inc.</h3>
                              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit
                                  amet
                                  consectetur adipisicing elit.
                                  Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                              <ul
                                  className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                  <li className="flex items-center py-3">
                                      <span>Status</span>
                                      <span className="ml-auto"><span
                                          className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                  </li>
                                  <li className="flex items-center py-3">
                                      <span>Member since</span>
                                      <span className="ml-auto">Nov 07, 2016</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="my-4"></div>
                          <div className="bg-white dark:bg-slate-900 p-3 hover:shadow">
                              <div
                                  className="flex items-center space-x-3 font-semibold text-gray-900 dark:text-gray-200 text-xl leading-8">
                        <span className="text-green-500">
                            <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </span>
                                  <span>Similar Profiles</span>
                              </div>
                              <div className="grid grid-cols-3 dark:text-gray-200">
                                  <div className="text-center  my-2">
                                      <img className="h-16 w-16 rounded-full mx-auto"
                                           src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                           alt="" />
                                          <a href="#" className="text-main-color">Kojstantin</a>
                                  </div>
                                  <div className="text-center my-2">
                                      <img className="h-16 w-16 rounded-full mx-auto"
                                           src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                           alt=""/>
                                          <a href="#" className="text-main-color">James</a>
                                  </div>
                                  <div className="text-center my-2">
                                      <img className="h-16 w-16 rounded-full mx-auto"
                                           src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                           alt=""/>
                                          <a href="#" className="text-main-color">Natie</a>
                                  </div>
                                  <div className="text-center my-2">
                                      <img className="h-16 w-16 rounded-full mx-auto"
                                           src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                           alt=""/>
                                          <a href="#" className="text-main-color">Casey</a>
                                  </div>
                              </div>
                          </div>
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
                                          <div className="px-4 py-2 font-semibold">First Name</div>
                                          <div className="px-4 py-2">Jane</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Last Name</div>
                                          <div className="px-4 py-2">Doe</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Gender</div>
                                          <div className="px-4 py-2">Female</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Contact No.</div>
                                          <div className="px-4 py-2">+11 998001001</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Current Address</div>
                                          <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                          <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Email.</div>
                                          <div className="px-4 py-2">
                                              <a className="text-blue-800"
                                                 href="mailto:jane@example.com">jane@example.com</a>
                                          </div>
                                      </div>
                                      <div className="grid grid-cols-2">
                                          <div className="px-4 py-2 font-semibold">Birthday</div>
                                          <div className="px-4 py-2">Feb 06, 1998</div>
                                      </div>
                                  </div>
                              </div>
                              <button
                                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-3 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                  Full Information
                              </button>
                          </div>

                          <div className="my-4"></div>

                          <div className="bg-white dark:bg-slate-900 p-3 shadow-sm rounded-sm">

                              <div className="grid grid-cols-2">
                                  <div>
                                      <div
                                          className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </span>
                                          <span className="tracking-wide">Experience</span>
                                      </div>
                                      <ul className="list-inside space-y-2">
                                          <li>
                                              <div className="text-teal-600">Owner at Her Company Inc.</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                          <li>
                                              <div className="text-teal-600">Owner at Her Company Inc.</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                          <li>
                                              <div className="text-teal-600">Owner at Her Company Inc.</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                          <li>
                                              <div className="text-teal-600">Owner at Her Company Inc.</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                      </ul>
                                  </div>
                                  <div>
                                      <div
                                          className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-gray-200 leading-8 mb-3">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                        <path fill="#fff"
                                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                                    </svg>
                                </span>
                                          <span className="tracking-wide">Education</span>
                                      </div>
                                      <ul className="list-inside space-y-2">
                                          <li>
                                              <div className="text-teal-600">Masters Degree in Oxford</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                          <li>
                                              <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                              <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>

          </main>

          <Footer/>
      </div>
  )
}
export default Profile;