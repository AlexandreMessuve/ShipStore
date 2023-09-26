import React from 'react';
import Navbar from "./component/NavBar";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import Home from './pages/';
import Product from './pages/product';
import Logout from './pages/logout';
import Cart from './pages/cart';
import Login from "./pages/login";
import Account from "./pages/account";
import Confirm from "./pages/confirm";
import Register from "./pages/register"
import './App.css';
import Admin from "./pages/admin";
import { isExpired} from "react-jwt";
import Cookie from "js-cookie";

const token = localStorage.getItem('token');


function App() {
    if (token) {
        const myExpireTimeToken = isExpired(token);
        if (myExpireTimeToken){
            Cookie.remove('token', {path: '/'});
            window.location.href = '/';
            return
        }
    }

    return (
        <Router>
            <header>
                <Navbar/>
            </header>
            <div className={'w-full bg-gray-100 h-full'}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/product/:productId' element={<Product />}  />
                    <Route path='/cart' element={<Cart/> } />
                    <Route path={'/account'} element={<Account />} />
                    <Route path='/confirm' element={<Confirm />} />
                    <Route path={'/admin'} element={<Admin />} />
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/logout'} element={<Logout />}/>
                </Routes>

            </div>

        </Router>
    );
}
export default App;