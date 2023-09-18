import React from 'react';
import axios from 'axios';
import "../product.css";


export default class ProductList extends React.Component {
    state = {
        products: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/products`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }

    render() {
        return (
            <div className={"Product"}>
                {
                    this.state.products
                        .map((product) => {
                            let stock = "";
                            if (product.stockNumber > 0){
                                 stock =                                        <button
                                                                                className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5"
                                                                                    viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path
                                                                                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                                                                 </svg>
                                                                                 Ajouter au panier
                                                                            </button>
                            }else {
                                 stock =                                         <p className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20\" fill="currentColor">
                                                                                   <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                                                               </svg>
                                                                               Rupture de stock</p>
                            }
                            return(
                                <div key={product.id}
                                    className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                                    <a className="relative flex h-60 overflow-hidden" href={"/product/" + product.id}>
                                        <img className="absolute top-0 right-0 h-full w-full object-cover"
                                             src={product.picture} alt={product.name}/>
                                    </a>
                                    <div className="mt-4 px-5 pb-5">
                                        <a href="#">
                                            <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                                        </a>
                                        <div className="mt-2 mb-5 flex items-center justify-between">
                                            <p>
                                                <span className="text-3xl font-bold text-slate-900">{product.price} €</span>
                                            </p>
                                        </div>
                                        {stock}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        )
    }
    }