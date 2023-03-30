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

                <Button
                    className=''
                    title={"Login"}
                    loading={loading}
                    error={error.password}
                />
              <div className=' my-6'>
                <p className="mt-8 dark:text-slate-200">Don't have an account?
                  <Link to="/sign-up" className="text-blue-500 hover:text-blue-700 font-semibold"> Sign-up</Link>
                </p>

              </div>
              </form>
            </div>
          </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Login;


