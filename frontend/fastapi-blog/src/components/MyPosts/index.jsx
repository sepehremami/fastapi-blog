import DashboardHeader from "../DashboardHeader";
import Footer from "../Footer";
import SideBar from "../SideBar";
import {useState} from "react";

const myPosts = () => {
    const [toggleMenu, setToggleMenu] = useState(false);


  return(
      <div className={"font-body bg-slate-200 dark:bg-gradient-to-b dark:from-secondary-1 dark:to-primary"}>

          <div id="create_post" className={`text-left absolute ml-20p mt-40 w-full max-w-6xl  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ${toggleMenu ? "block" : "hidden"}`}>
              <form className="space-y-6" action="#">
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                  <div>
                      <label htmlFor="title"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                      <input type="text" name="title" id="title"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                             placeholder="Subject" required/>
                  </div>
                  <div>
                      <label htmlFor="article"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article</label>
                      <textarea name="article" id="article"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Article" required></textarea>
                  </div>

                  <label className="block mb-2 text-sm font-medium font-medium text-gray-900 dark:text-white"
                         htmlFor="user_avatar">Upload Pictures</label>
                  <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help" id="user_avatar" type="file" />


                      <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer"/>
                              <div
                                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              <span
                                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                      </label>

                      <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                              <div
                                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              <span
                                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span>
                      </label>

                      <label className="relative inline-flex items-center mb-3 cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" disabled />
                              <div
                                  className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              <span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">Disabled toggle</span>
                      </label>


                      <fieldset>
                          <legend className="sr-only">Checkbox variants</legend>

                          <div className="flex items-center mb-4">
                              <input checked id="checkbox-1" type="checkbox" value=""
                                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-1"
                                         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree
                                      to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms
                                          and conditions</a>.</label>
                          </div>

                          <div className="flex items-center mb-4">
                              <input id="checkbox-2" type="checkbox" value=""
                                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-2"
                                         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want to
                                      get promotional offers</label>
                          </div>

                          <div className="flex items-center mb-4">
                              <input id="checkbox-3" type="checkbox" value=""
                                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor="checkbox-3"
                                         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am 18
                                      years or older</label>
                          </div>

                          <div className="flex mb-4">
                              <div className="flex items-center h-5">
                                  <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox"
                                         value=""
                                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                              </div>
                              <div className="ml-2 text-sm">
                                  <label htmlFor="helper-checkbox"
                                         className="font-medium text-gray-900 dark:text-gray-300">Free shipping via
                                      Flowbite</label>
                                  <p id="helper-checkbox-text"
                                     className="text-xs font-normal text-gray-500 dark:text-gray-400">For orders shipped
                                      from $25 in books or $29 in other categories</p>
                              </div>
                          </div>

                          <div className="flex items-center">
                              <input id="international-shipping-disabled" type="checkbox" value=""
                                     className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                     disabled />
                                  <label htmlFor="international-shipping-disabled"
                                         className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Eligible
                                      for international shipping (disabled)</label>
                          </div>
                      </fieldset>


                      <label htmlFor="website-admin"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <div className="flex">
                          <span
                              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            @
                          </span>
                          <input type="text" id="website-admin"
                                 className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder="Category"/>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                          <button type="submit"
                                  className="col-span-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                          </button>
                          <button id="cancel"  onClick={() => setToggleMenu(!toggleMenu)}
                                  className="col-span-1 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel
                          </button>
                      </div>
              </form>

          </div>

          <DashboardHeader/>

          <main className="grid grid-cols-5 ">
              <SideBar/>
              <div id="cards" className="col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">

                      <a href="#"
                         className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <img
                              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                              src=""
                              alt=""/>
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                      technology acquisitions 2021</h5>
                                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest
                                      enterprise technology acquisitions of 2021 so far, in reverse chronological
                                      order.</p>
                              </div>
                      </a>

                      <a href="#"
                         className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <img
                              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                              src=""
                              alt=""/>
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                      technology acquisitions 2021</h5>
                                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest
                                      enterprise technology acquisitions of 2021 so far, in reverse chronological
                                      order.</p>
                              </div>
                      </a>

                      <a href="#"
                         className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <img
                              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                              src=""
                              alt=""/>
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                  <h5 className="mb-2 md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                      technology acquisitions 2021</h5>
                                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest
                                      enterprise technology acquisitions of 2021 so far, in reverse chronological
                                      order.</p>
                              </div>
                      </a>

                  </div>
                  <button id="post_button"  onClick={() => setToggleMenu(!toggleMenu)}
                       className="justify-center flex gap-1 my-4 py-1.5 px-5 mx-30p md:mx-40p cursor-pointer md:text-lg border rounded-xl dark:text-slate-400 border-secondary-1 dark:bg-gradient-to-br from-black to-slate-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="w-8 h-8">
                          <path stroke-linecap="round" strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <p className="pt-0.5 font-bold">CREATE A POST</p>
                  </button>


              </div>

          </main>

          <Footer/>
      </div>
  )
}
export default myPosts;