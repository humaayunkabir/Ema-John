import React, { useState } from 'react';
import { useEffect } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storeCart = getStoreCart();
        const savedCart = [];
        for (const id in storeCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const addProductToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(products => products.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        setCart(newCart);
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        addProductToCart={addProductToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;