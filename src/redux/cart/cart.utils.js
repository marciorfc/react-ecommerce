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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => isTheSameId(cartItem, cartItemToRemove));

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => !isTheSameId(cartItem, cartItemToRemove));
    }

    return cartItems.map(cartItem => 
        isTheSameId(cartItem, cartItemToRemove) ? 
        {
            ...cartItem,
            quantity: cartItem.quantity - 1
        } : cartItem
    );
}