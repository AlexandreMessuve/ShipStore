import React, {useState} from 'react';
import ProductList from "../component/ProductList";

const Home = () => {

    return (
        <div className={"w-100-l mx-auto"}>
            <h1 className={"text-bold text-xl text-center"}>Bienvenue sur ShipStore</h1>
            <ProductList/>
        </div>
    );
};

export default Home;