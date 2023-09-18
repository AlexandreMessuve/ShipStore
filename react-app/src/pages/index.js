import React from 'react';
import ProductList from "../component/ProductList";
import "../product.css";

const Home = () => {
    return (
        <div>
            <div
                style={{
                    justifyContent: 'center',
                }}
            >

                <ProductList/>
            </div>

        </div>
    );
};

export default Home;