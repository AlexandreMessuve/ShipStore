import React, {useState, useEffect} from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');


const Account = () => {
    if (token === null) {
        window.location.href = '/';
    }
    const [user, setUser] = useState()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/order', {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token)
            }
        }).then((response) => {
            console.log(response)
            setUser(response.data.user);
            setOrders(response.data.user.orders)
            setIsLoading(false);
        })
            .catch((error) => console.log(error))
    },[]);

    useEffect(() => {
        // Utilisez cet effet pour observer les changements dans `user`
        if (user) {
            console.log(user);
        }
    }, [user]);

    return (
        <div>
            {
                isLoading ? (
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
                ):(
                    <>
                        <h1>Mon compte</h1>
                        <div>
                            <h1>Mes information</h1>
                            <table>
                                <thead>
                                <tr>
                                    <th className="text-left font-semibold">Nom</th>
                                    <th className="text-left font-semibold">Prénom</th>
                                    <th className="text-left font-semibold">Email</th>
                                    <th className="text-left font-semibold">Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={user.id}>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h1>Mes commandes</h1>
                            <table>
                                <thead>
                                <tr>
                                    <th className="text-left font-semibold">Detail</th>
                                    <th className="text-left font-semibold">Reference</th>
                                    <th className="text-left font-semibold">Prix</th>
                                    <th className="text-left font-semibold">Date</th>
                                    <th className="text-left font-semibold">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    orders.map((order) =>(
                                        <>
                                            <tr key={order.id}>
                                                <td className={'flex'}>
                                                    {Array.isArray(order.products) ? (
                                                            order.products.map((product, index) => (
                                                                <span key={product.productId}>
                                                                    {product.name} x {order.productsQuantity[index].quantity}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            // Gérez le cas où order.products n'est pas un tableau
                                                            <span>Aucun produit disponible</span>
                                                        )
                                                    }
                                                </td>
                                                <td>{order.ref}</td>
                                                <td>{order.price}</td>
                                                <td>{order.dateOrder}</td>
                                                <td>inconnu</td>
                                            </tr>

                                        </>
                                    ))
                                }
                                </tbody>
                            </table>

                        </div>
                    </>
                )
            }

        </div>
    );
};

export default Account;