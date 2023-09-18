import React from 'react';
import "../product.css";
import ProductDetail from "../component/ProductDetail";

const Product= () => {
    return (
        <div>
                <div>
                    <h1 className={'f-5'}>Detail</h1>
                </div>
                <div>
                    <ProductDetail/>
                </div>
        </div>
    );
};

export default Product;