import React from 'react';
const token = localStorage.getItem('token');
const Confirm = () => {

    if (!token) {
        window.location.href = '/';
    }
    return (
        <>
            <div>
                <h1 className={'text-center text-4xl'}>Commande validé avec succés</h1>
            </div>
        </>

    );
};

export default Confirm;