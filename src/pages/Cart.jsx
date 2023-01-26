import React, { useState } from 'react';
import { getItem, setItem } from '../services/localStorageFuncs';
import { BsCartDashFill } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import EmptyCart from '../components/EmptyCart';
import Footer from '../components/Footer';

function Cart() {
    const [data, setData] = useState(getItem('carrinho') || []);
    const cartTitle = <h2>Cart</h2>;


    const removeItemFromCart = (object) => {
        const arrayFilter = data.filter(element => element.id != object.id);
        setData(arrayFilter);
        setItem('carrinho', arrayFilter);

    }

    return (
        <>
            <Navbar />
            <main className="container">
                {
                    (!data.length == 0) ? cartTitle : null
                }

                <div className="products-container">
                    {

                        (data.length == 0) ? (<EmptyCart />) :

                            data.map(element => (
                                <div className='product-card' key={element.id}>
                                    <h4 id='title'>{element.title}</h4>
                                    <img src={element.thumbnail} alt="" />
                                    <h4>{element.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                                    <button
                                        onClick={() => removeItemFromCart(element)}
                                    >
                                        <BsCartDashFill />
                                    </button>
                                </div>
                            ))
                    }
                </div>

            </main>

            <Footer/>
        </>


    );
}

export default Cart;