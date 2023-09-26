import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import ProductItem from "./ProductItem";
import {CartContext} from "../context/CartContext";
import {IoEyeSharp} from "react-icons/io5";


function ProductList() {
    const [productsList, setProducts] = useState([])
    const { addToCart } = useContext(CartContext)
    useEffect(() => {
            axios.get(`http://127.0.0.1:8000/api/products`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    document.getElementById('loading-overlay').style.display = 'none'
                    setProducts(res.data)
                })
                .catch(err => console.error(err))
        }, []);


    return (
        //on retourne la liste des produits
        <div className={'flex flex-wrap container justify-center mx-auto mt-2'}>
            <div id="loading-overlay"  className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">

                <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>

                <span className="text-white text-3xl font-bold">Chargement...</span>

            </div>
            {
            productsList.map((product) => {
                return (
                    <div key={product.id}
                        className="group my-5 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md mx-5 rounded-3xl">
                        <a className="relative flex h-60 overflow-hidden" href={"/product/" + product.id}>
                            <img className="absolute top-0 right-0 h-full w-full object-cover"
                                 src={product.picture} alt={product.name}/>
                        </a>
                        <div className="px-5 pb-5">
                            <div className={'flex justify-around my-3'}>
                                <h5 className="text-xl tracking-tight text-slate-900">Nom:</h5>
                                <a href={'/product/'+ product.id}>
                                    <span className="text-xl font-bold tracking-tight text-slate-900">{product.name}</span>
                                </a>

                            </div>
                            <div className={'flex justify-around my-3'}>
                                <h5 className="text-xl tracking-tight text-slate-900">Prix :</h5>
                                <span className="text-xl font-bold text-slate-900">{product.price} €</span>
                            </div>
                            <div className={'flex justify-between'}>
                                <a href={'/product/'+product.id} className="btn flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                                    <IoEyeSharp/>
                                    Voir le produit
                                </a>
                                <button onClick={() => addToCart(product)}
                                        className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                    </svg>
                                    Ajouter au panier
                                </button>

                            </div>

                        </div>

                    </div>


                )

            } )
        }
        </div>


    )
}

export default ProductList;