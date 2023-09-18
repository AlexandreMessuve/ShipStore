import React from 'react';
import Navbar from "./component/NavBar";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import Home from './pages/';
import About from './pages/about';
import Team from './pages/teams';
import Product from './pages/product';
import SignUp from './pages/signup';
import SignIn from "./pages/signin";
import './App.css';


function App() {
    const params = useParams();

    console.log(params);

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />}  />
                <Route path='/team' element={<Team />}  />
                <Route path='/product/:productId' element={<Product />}  />
                <Route path='/sign-up' element={<SignUp />}  />
                <Route path={'/sign-in'} element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}
export default App;