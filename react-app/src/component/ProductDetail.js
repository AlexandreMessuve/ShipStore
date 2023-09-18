import React from 'react';
import axios from 'axios';
import "../product.css";
import {useParams} from "react-router-dom";

function withParams(Component){
    return props => <Component {...props} params={useParams()} />
}

class ProductDetail extends React.Component {
    state = {
        product: []
    }


    componentDidMount() {
        const id = this.props.params.productId
        console.log(id)
        axios.get(`http://127.0.0.1:8000/api/products/`+id)
            .then(res => {
                const product = res.data;
                this.setState({ product });
            })
    }
    render() {
        //on verifi si le produit est en stock
        let dispo
        if(this.state.product.stockNumber > 0){
            dispo = <span className="text-gray-600">En stock</span>
        }else {
            dispo = <span className="text-gray-600">Rupture de stock</span>
        }
        return (
                    <div className="bg-gray-100 py-8" key={this.state.product.id}>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                        <img className="w-full h-full object-cover"
                                             src={this.state.product.picture}
                                             alt={this.state.product.name}/>
                                    </div>
                                    <div className="flex -mx-2 mb-4">
                                        <div className="w-1/2 px-2">
                                            <button
                                                className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add
                                                to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold mb-2">{this.state.product.name}</h2>
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                            <span className="font-bold text-gray-700">Prix:</span>
                                            <span className="text-gray-600">{this.state.product.price} €</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700">Disponibilité:</span>
                                            {dispo}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700">Product Description:</span>
                                        <p className="text-gray-600 text-sm mt-2">{this.state.product.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
        )
    }
}

export default withParams(ProductDetail);