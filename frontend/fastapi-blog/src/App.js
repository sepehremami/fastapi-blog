import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import Home from './pages/home';
import ErrorPage from './pages/error-page';
import MyProfile from './pages/profile';
import ProfileView from './pages/profileView';
import UserProfileToggle from './pages/testf/profile';
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";
import PostView from './pages/PostView/PostView.jsx/PostView';
import AboutUs from './pages/About';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path="/posts/:id" element={<PostView/>} />
          <Route exact path="/auth/me" element={<MyProfile />} />
          <Route path={"/my-posts"} element={<Userpage/>}/>
          <Route exact path="/profile" element={<ProfileView />} />
          <Route exact path="/make-post" element={<UserProfileToggle />} />
          <Route path={"/about"} element={<AboutUs/>} />
          <Route exact={true} path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
