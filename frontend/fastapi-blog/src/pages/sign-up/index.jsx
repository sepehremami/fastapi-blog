import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import Footer from "../../components/Footer";

const client = new FastAPIClient(config);

const SignUp = () => {
  const [error, setError] = useState({username: '', email: '', password: '',  phone: "" });

  const [registerForm, setRegisterForm] = useState({username: '', email: '', password: '',  phone: "" });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    setError(false);

    if(registerForm.username.length <= 0)
    {
      setLoading(false)
      return setError({username: "Please Enter Your Full Name"})
    }
    if(registerForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(registerForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Please Enter Password"})
    }
    if(registerForm.phone.length <= 0)
    {
      setLoading(false)
      return setError({phone: "Please Enter Your Phone"})
    }

    console.log(JSON.stringify(registerForm));


    client.register(registerForm.username, registerForm.email, registerForm.password, registerForm.phone)
      .then( () => {
        navigate('/login')
      })
      .catch( (err) => {
        setLoading(false);
        setError(true);
        alert(err)
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


              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 dark:text-slate-200">Create an account</h1>

              <form className="mt-6 border-b pb-6 border-secondary-1"  onSubmit={(e) => onRegister(e)}>
                <FormInput
                    type={"text"}
                    name={"fullName"}
                    label={"Full Name"}
                    error={error.username}
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value })}
                />
                <FormInput
                    type={"email"}
                    name={"email"}
                    label={"Email"}
                    error={error.email}
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value })}
                />

                <FormInput
                    type={"password"}
                    name={"password"}
                    label={"Password"}
                    error={error.password}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value })}
                />
                <FormInput
                    type={"text"}
                    name={"phone"}
                    label={"phone"}
                    error={error.phone}
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value })}
                />
                <Button title={"Create Account"} error={error.password} loading={loading} />
              </form>

              <div className="my-6 border-gray-300 w-full">

                

                <p className="mt-8 dark:text-slate-200">Already have an account?
                  <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold"> Login</Link>
                </p>

              </div>


            </div>
          </div>

        </section>

        <Footer/>

    </div>
  )
}

export default SignUp;


