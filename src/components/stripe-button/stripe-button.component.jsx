import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IbEtgCGG8uptggOBvGdTsChTPvrhzjOfpFAY5A1t5AknPGOafy1dd06AoC8JK4AhWHHebbZ6zOiSWfCtPoPh5C3007uWvEcOJ';
    
    const onToken = token => {
        console.log(token);
        alert('Payment succesful')
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name="Crown Clothing Ltd."
            billingAddress
            shippingAddress
            image='https://sendeyo.com/en/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;


