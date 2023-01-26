import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { setItem, getItem } from '../services/localStorageFuncs';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StoreForm from '../components/StoreForm';
import Footer from '../components/Footer';

function Store() {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinho') || []);
    const [isEmptySearchParam, setIsEmptySearchParam] = useState(false);



    const filterProduct = (searchParam) => {
        let arrayFilter = [];
        let isEmptySearchParam = searchParam == "" || null;

        if (isEmptySearchParam) return setIsEmptySearchParam(true);

        setIsEmptySearchParam(false);


        data.forEach(element => {
            let title = element.title;
            let isSimilarTitle = title.includes(searchParam);
            if (isSimilarTitle) {
                arrayFilter.push(element);
            }
        });
        setData(arrayFilter);
    }





    useEffect(() => {
        const fetchApi = async () => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
            const response = await fetch(url);
            const responseJson = await response.json();
            setData(responseJson.results);
        }

        fetchApi();

    }, [isEmptySearchParam]);

    const handleClick = (object) => {
        const currentElement = cart.find(element => element.id == object.id);

        if (currentElement) {
            const arrayFilter = cart.filter(element => element.id != currentElement.id);
            setCart(arrayFilter);
            setItem('carrinho', arrayFilter);
            alert('Produto removido do carrinho!');
        } else {
            setCart([...cart, object]);
            setItem('carrinho', [...cart, object]);
            alert('Produto adicionado ao carrinho!');
        }


    }


    return (
        <>
            <Navbar />
            <main className='container'>
                <h2>Store</h2>
                <StoreForm filterProduct={filterProduct} />
                <div className="products-container">
                    {
                    
                    data.map(element => (
                        <div className='product-card' key={element.id}>
                            <h4>{element.title}</h4>
                            <img src={element.thumbnail} alt="cell image" />
                            <h4>{element.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                            <button
                                onClick={() => handleClick(element)}
                            >
                                {
                                    cart.some(cartItem => cartItem.id == element.id) ? (
                                        <BsFillCartCheckFill />
                                    ) : (
                                        <BsFillCartPlusFill />
                                    )
                                }
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Store;