import React, {useContext} from 'react';
import {CartContext} from "../context/CartContext";
import {ImSpinner8} from "react-icons/im";
import axios from "axios";
import {AiOutlineCheck} from "react-icons/ai";
const token = localStorage.getItem('token');


const Cart = () => {
    const { cartItems, addToCart, removeFromCart,removeFromCartItem,getCartTotalTTC,getCartTVA,getCartTotalHT} = useContext(CartContext)

    const handleConfirm = async (event) => {
        event.preventDefault();
        document.getElementById('confirmCart').innerHTML = '';
        document.getElementById('confirmCart').append(
            <ImSpinner8 className={'animate-spin mx-2'}/> + 'Chargement'
        );
        await axios.post('http://localhost:8000/api/confirm/order', {
            orders: cartItems,
            price: getCartTotalTTC(),
        },{
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token),
                'Access-Control-Allow-Origin': null
            }
        }).then((res) =>{
            document.getElementById('confirmCart').innerHTML = '';
            document.getElementById('confirmCart').append(
                <AiOutlineCheck /> +'Valider'
            );
            console.log(res)
        }).catch(err => console.log(err))

    }
    return (
        <>
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Mon panier</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Produit</th>
                                        <th className="text-left font-semibold">Prix</th>
                                        <th className="text-left font-semibold">Quantité</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        cartItems.length > 0 ? (
                                            cartItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <img className="h-16 w-16 mr-4" src={item.picture} alt={item.name}/>
                                                            <span className="font-semibold">{item.name}</span>
                                                        </div>
                                                        <a href="#" onClick={() => removeFromCartItem(item)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Supprimer</a>
                                                    </td>
                                                    <td className="py-4">{item.price} €</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <button onClick={() => removeFromCart(item)} className="border rounded-md py-2 px-4 mr-2">-</button>
                                                            <span className="text-center w-8">{item.quantity}</span>
                                                            <button onClick={() => addToCart(item)} className="border rounded-md py-2 px-4 ml-2">+</button>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">{item.allPrice} €</td>
                                                </tr>
                                            ))):(
                                            <tr>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold">Panier vide</span>
                                                    </div>
                                                </td>
                                                <td className="py-4"></td>
                                                <td className="py-4">
                                                </td>
                                                <td className="py-4"></td>
                                            </tr>
                                        )
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Résumer</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Total HT</span>
                                    <span>{getCartTotalHT()} €</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>TVA 20%</span>
                                    <span>{getCartTVA()} €</span>
                                </div>
                                <hr className="my-2"/>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total TTC</span>
                                        <span className="font-semibold">{getCartTotalTTC()} €</span>
                                    </div>
                                {
                                    cartItems.length > 0 && token ? (
                                        <button id={'confirmCart'} onClick={handleConfirm} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Valider le panier</button>
                                    ):(
                                        <h1 className={'text-sm text-center'}>Veuillez vous <a className={'text-blue-500 hover:text-blue-700'} href={'/login'}>connecter</a> ou vous <a className={'text-blue-500 hover:text-blue-700'} href={'/register'}>inscrire</a> pour pouvoir valider la commande</h1>

                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;