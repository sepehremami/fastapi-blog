import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import Footer from "../../components/Footer";

const client = new FastAPIClient(config);

const Login = () => {
  const [error, setError] = useState({email: "", password: ""});
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onLogin = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true)

    if(loginForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(loginForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Please Enter Password"})
    }

    client.login(loginForm.email, loginForm.password)
      .then( () => {
        navigate('/auth/me')
      })
      .catch( (err) => {
        setLoading(false)
        setError(true);
      
      });
  }

  return (
      <div>
        <DashboardHeader/>
      {/*<section className="">*/}
      {/*  <DashboardHeader/>*/}
      {/*  <div className="border-b border-black">*/}
      {/*      <div className="border-r bg-white">*/}
      {/*        <header>*/}
      {/*          /!* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> *!/*/}
      {/*          <div className="bg-white">*/}
      {/*          <svg className="bg-white" width="54" height="54" viewBox="0 0 54 54" fill='white'  xmlns="http://www.w3.org/2000/svg" >*/}
      {/*            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>*/}
      {/*          </svg>*/}
      {/*          </div>*/}
      {/*        </header>*/}
      {/*        <form onSubmit={(e) => onLogin(e)}>*/}
      {/*          <FormInput */}
      {/*            type={"text"}*/}
      {/*            name={"username"}*/}
      {/*            label={"Email"}*/}
      {/*            error={error.email}*/}
      {/*            value={loginForm.email}*/}
      {/*            onChange={(e) => setLoginForm({...loginForm, email: e.target.value })}*/}
      {/*          />*/}
      {/*          <FormInput */}
      {/*            type={"password"}*/}
      {/*            name={"password"}*/}
      {/*            label={"Password"}*/}
      {/*            error={error.password}*/}
      {/*            value={loginForm.password} */}
      {/*            onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}*/}
      {/*          />*/}
      {/*          <Button */}
      {/*            title={"Login"}  */}
      {/*            loading={loading}*/}
      {/*            error={error.password}*/}
      {/*            />      */}
      {/*        </form>*/}
      {/*        <footer>*/}
      {/*          <Link className="" to="/sign-up">Create Account</Link>*/}
      {/*        </footer> */}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*</section>*/}





        <section
            className="flex flex-col md:flex-row h-screen items-center dark:bg-gradient-to-b dark:from-secondary-1 dark:to-primary pt-32 pb-32 bg-gradient-to-t from-slate-300 to-primary">


          <div className="bg-slate-200 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center dark:bg-gradient-to-b dark:from-primary dark:to-secondary-1">

            <div className="w-full h-100">


              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 dark:text-slate-200">Log in to your
                account</h1>

              <form className="mt-6"  onSubmit={(e) => onLogin(e)}>
                <div>
                  <FormInput
                      type={"text"}
                      name={"username"}
                      label={"Email"}
                      error={error.email}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value })} />
                </div>

                <div className="mt-4">
                    <FormInput type={"password"}
                               name={"password"}
                               label={"Password"}
                               error={error.password}
                               value={loginForm.password}
                               onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}
                               />
                </div>

                <div className="text-right mt-2 ">
                  <Link to="#"
                     className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 dark:text-slate-200">Forgot
                    Password?</Link>
                </div>

                <Button
                    title={"Login"}
                    loading={loading}
                    error={error.password}
                />
              </form>

              <div className="my-6 border-gray-300 w-full">

                <button type="button"
                        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                         viewBox="0 0 48 48"><defs><path id="a"
                                                         d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath
                        id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" fill="#FBBC05"
                                                                                        d="M0 37V11l17 13z"/><path
                        clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clipPath="url(#b)"
                                                                                                  fill="#34A853"
                                                                                                  d="M0 37l30-23 7.9 1L48 0v48H0z"/><path
                        clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                    <span className="ml-4 ">
                      Log in
                      with
                      Google
                    </span>
                  </span>
                </button>

                <p className="mt-8 dark:text-slate-200">Need an account?
                  <Link to="/sign-up" className="text-blue-500 hover:text-blue-700 font-semibold">Create an account</Link>
                </p>

              </div>


            </div>
          </div>

        </section>

        <Footer/>

    </div>
  )
}

export default Login;


