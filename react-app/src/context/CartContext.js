import { createContext, useState, useEffect} from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [])
    //Permet d'ajouter un produit dans le panier
    const addToCart = (item) => {

        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)
        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id ? {
                    ...cartItem, quantity: cartItem.quantity + 1,allPrice: (cartItem.price * (cartItem.quantity +1)).toFixed(2)
                    }
                    : cartItem
                )
            )
        }else {
            setCartItems([...cartItems, { ...item, quantity: 1, allPrice: item.price}])
        }
    }

    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem)=> cartItem.id === item.id)
        if (isItemInCart.quantity === 1){
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))
        }else {
            setCartItems(
                cartItems.map((cartItem) =>
                cartItem.id === item.id ? {
                    ...cartItem, quantity: cartItem.quantity - 1, allPrice: (cartItem.price * (cartItem.quantity -1)).toFixed(2)
                }: cartItem
                )
            )
        }
    }
    const removeFromCartItem = (item) => {
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(newCartItems)

    }
    const clearCart = () => {
        setCartItems([])
    }


    const getCartTotalHT = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity,0).toFixed(2)
    }
    const getCartTVA = () => {
        return (parseFloat(getCartTotalHT())* 20/100).toFixed(2)
    }
    const getCartTotalTTC = () =>{
        return (parseFloat(getCartTotalHT())+parseFloat(getCartTVA())).toFixed(2)
    }
    useEffect(() => {
        getCartTVA();
        getCartTotalTTC();
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems')
        if (cartItems){
            setCartItems(JSON.parse(cartItems))
        }

    },[])

    return(
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getCartTotalHT,
            removeFromCartItem,
            getCartTVA,
            getCartTotalTTC
        }}>
            {children}
        </CartContext.Provider>
    )
}