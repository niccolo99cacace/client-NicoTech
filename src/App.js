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
import { HomeItemsProvider } from "./contexts/HomeItemsContext";
import  ProfileManagement  from './pages/ProfileManagement';
import  ResetPassword  from './pages/ResetPassword.jsx';
import { AdminOrNotProvider } from "./contexts/AdminOrNotContext";
import AddItem from "./pages/admin/AddItem";
import  ImagesOnCloud   from './pages/admin/ImagesOnCloud.jsx';


function App() {

  //questo per evitare che la NavBar appaia quando mi trovo nella pagina per resettare la password
  const pathname = window.location.pathname;
  const navBarOff = pathname.includes("/reset-password");

  
  return (
  <React.Fragment>
  <AdminOrNotProvider>
  <HomeItemsProvider>
  <AuthenticationProvider>
  <CartCountProvider>
<BrowserRouter>
{!navBarOff && <NavBar/> }
<Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/Cart" element={<ShoppingCart/>}/>
        <Route path="item/:itemId" element={<ItemPage/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/userManagement" element={<ProfileManagement/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/AddItem" element={<AddItem/>}/>


        <Route path="/Cloud" element={<ImagesOnCloud />}/>

        </Routes>
        </BrowserRouter>
        </CartCountProvider>
        </AuthenticationProvider>
        </HomeItemsProvider>
        </AdminOrNotProvider>
        </React.Fragment>
        )
};


export default App;
 