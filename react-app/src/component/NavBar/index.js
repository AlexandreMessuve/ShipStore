import React, {useContext} from 'react';
import './navbar.css';
import { CartContext} from "../../context/CartContext";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';
import {AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart} from "react-icons/ai";
import { decodeToken, isExpired} from "react-jwt";
const token = localStorage.getItem('token');


const Index = () => {
        const {cartItems} = useContext(CartContext)
        let link
        link = token !== null;
        let isAdmin = false
        if (link) {
            const myDecodeToken = decodeToken(token)
            const expired = isExpired(token)
            if (expired){
                localStorage.removeItem('token')
                window.location.reload();
            }
            if (myDecodeToken['roles'][0] === "ROLE_ADMIN" ){
                isAdmin = true;
            }

        }

        return (
            <>
                <Nav>
                    <Bars />

                    <NavMenu>

                        <NavLink className={'logo'} to='/' active={'true'}>
                            ShipStore
                        </NavLink>


                        {link ? (
                            <>
                                <NavLink to='/account' active={'true'}>Mon compte</NavLink>
                            </>


                        ):(
                            <>
                                <NavLink to='/register' active={'true'}>S'inscrire</NavLink>
                            </>
                        )}
                        {
                            isAdmin ? (
                                <NavLink to='/admin' active={'true'}>Admin</NavLink>
                            ):(
                                <></>
                            )
                        }
                        {/* Second Nav */}
                        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    </NavMenu>
                        <NavBtn>
                            {link ? (
                                <NavBtnLink to={'/logout'}>
                                    <AiOutlineLogout />
                                </NavBtnLink>
                            ):(
                                <NavBtnLink to='/login'>
                                    <AiOutlineLogin />
                                </NavBtnLink>
                            )}

                                <NavBtnLink to='/cart' active={'true'}>
                                    <AiOutlineShoppingCart />
                                    {
                                        cartItems.length > 0 ?
                                        <div className={"w-4 h-4 rounded-full bg-red-500 flex justify-center items-center text-white bottom-0 right-0 translate-y-1/4 text-xs absolute"}>
                                            {cartItems.length}
                                        </div> : null
                                    }

                                </NavBtnLink>


                        </NavBtn>

                </Nav>
            </>
        );
};

export default Index;