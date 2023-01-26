import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import '../styles/EmptyCart.css';

function EmptyCart() {
    return (
        <div className='empty-cart'>
            <i><BsCart4 /></i>
            <h3>Your cart is empty</h3>
        </div>
    );
}

export default EmptyCart;