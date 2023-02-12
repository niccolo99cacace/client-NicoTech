import Home  from './pages/Home';
import React from 'react';
import './App.css';
import  Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import  ShoppingCart  from './pages/ShoppingCart';
import  ItemPage  from './pages/ItemPage';
import NavBar from './components/NavBar';
import {CartCountProvider} from "./contexts/CartCountContext";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
  <React.Fragment>
  <CartCountProvider>
<BrowserRouter>
  <NavBar/>
<Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/Cart" element={<ShoppingCart/>}/>
        <Route path="item/:itemId" element={<ItemPage/>}/>
        </Routes>
        </BrowserRouter>
        </CartCountProvider>
        </React.Fragment>
        )
};


export default App;
 