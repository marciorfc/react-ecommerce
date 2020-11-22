const isTheSameId = (cartItem, cartItemToAdd) => cartItem.id === cartItemToAdd.id;

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => isTheSameId(cartItem, cartItemToAdd));
 
    if (existingCartItem) {
        return cartItems.map(
            cartItem => isTheSameId(cartItem, cartItemToAdd) 
             ? {...cartItem, quantity: cartItem.quantity + 1} 
             : cartItem    
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}