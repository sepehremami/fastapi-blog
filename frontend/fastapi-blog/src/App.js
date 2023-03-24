import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import Home from './pages/home';
import ErrorPage from './pages/error-page';
import Navbar from './components/Navbar/Navbar';
import MyProfile from './pages/profile';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/auth/me" element={<MyProfile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact={true} path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
