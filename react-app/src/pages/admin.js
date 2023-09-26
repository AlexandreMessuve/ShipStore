import React from 'react';
const token = localStorage.getItem('token');
const Admin = () => {
    if (!token) {
        window.location.href = '/'
    }
    return (
        <div>
            <h1>Ajout d'un produit</h1>
        </div>
    );
};

export default Admin;