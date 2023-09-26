import React from 'react';
import ProductDetail from "../component/ProductDetail";

const Product= () => {
    return (
        <div className={'w-100-l'}>
                <div>
                    <h1 className={'f-5 text-center'}>Fiche Produit</h1>
                </div>
                <div className={"mx-auto"}>
                    <ProductDetail/>
                </div>
        </div>
    );
};

export default Product;