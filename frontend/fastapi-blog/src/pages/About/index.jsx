import DashboardHeader from "../../components/DashboardHeader";
import Footer from "../../components/Footer";
import React from "react";
function AboutUs() {
  return (
      <div 
     
      className="bg-gray-900 ">
        <DashboardHeader />
      <div 
      
      className="container  bg-gray-900 px-5 py-12 mx-auto lg:px-20">
        <div className="   text-white">
          <h1 className="mb-6 text-3xl font-medium">
            About Us
          </h1>
          <div className="container flex justify-center items-center mb-6">
            
           
          </div>
          <div className="">
            <p className="text-lg mb-8">
              We are a team of passionate code lovers dedicated to providing you with the best fastapi and react tips. Our goal is to make coding fun, easy, and enjoyable for everyone.
            </p>
            <p className="text-lg mb-8">
              With our extensive collection of Posts, you'll never run out of ideas for your next blog. From quick and easy weeknight shifts to impressive holiday works, we've got you covered.
            </p>
            <p className="text-lg mb-8">
              Thank you for choosing to code with us. We can't wait to see what you create!
            </p>
            <div className="container flex justify-center items-center mb-6">
             <a href="https://github.com/in-the-beningignin/fastapi-blog" className="text-teal-500 underline hover:text-teal-700">View on GitHub</a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;
