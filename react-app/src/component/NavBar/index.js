import React from 'react';
import './navbar.css';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Index = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>

                    <NavLink className={'logo'} to='/' active>
                        ShipStore
                    </NavLink>

                    <NavLink to='/product' active>
                        Produits
                    </NavLink>

                    <NavLink to='/about' active>
                        A Propos
                    </NavLink>

                    <NavLink to='/sign-up' active>
                        S'inscrire
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/sign-in'>Se connecter</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Index;