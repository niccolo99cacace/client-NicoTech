import Home  from './pages/Home';
import React from 'react';
import './App.css';
import  Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import  ShoppingCart  from './pages/ShoppingCart';
import  UserProfile  from './pages/UserProfile';
import  ItemPage  from './pages/ItemPage';
import NavBar from './components/NavBar';
import {CartCountProvider} from "./contexts/CartCountContext";
import { BrowserRouter } from "react-router-dom";
import {AuthenticationProvider} from "./contexts/AuthenticationContext";
import  ProfileManagement  from './pages/ProfileManagement';
import  ResetPassword  from './pages/ResetPassword.jsx';


function App() {
  return (
  <React.Fragment>
  <AuthenticationProvider>
  <CartCountProvider>
<BrowserRouter>
  <NavBar/>
<Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/Cart" element={<ShoppingCart/>}/>
        <Route path="item/:itemId" element={<ItemPage/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/userManagement" element={<ProfileManagement/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        </Routes>
        </BrowserRouter>
        </CartCountProvider>
        </AuthenticationProvider>
        </React.Fragment>
        )
};


export default App;
 