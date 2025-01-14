import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';
import './ProductList.css'; // Import CSS file for component-specific styles

const ProductList = () => {
  const dispatch = useDispatch();
  const [disabledProducts, setDisabledProducts] = useState([]); // State to store disabled products
  const cartItems = useSelector(state => state.cart.cartItems);

  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  const handleAddToCart = product => {
    dispatch(addItemToCart(product));
    setDisabledProducts(prevState => [...prevState, product.id]);
  };

  const handleProductEnabled = (productId) => {
    setDisabledProducts(prevState => prevState.filter(id => id !== productId)); // Remove from disabledProducts list
  };

  useEffect(() => {
    const cartProductIds = cartItems.map(item => item.id);
    setDisabledProducts(prevState => prevState.filter(id => cartProductIds.includes(id) === false));
  }, [cartItems]);

  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product => (
          <li key={product.id} className="product-list-item">
            <span>{product.name} - ${product.price}</span>
            <button 
              className={`add-to-cart-btn ${disabledProducts.includes(product.id) ? 'disabled' : ''}`} 
              onClick={() => handleAddToCart(product)}
              disabled={disabledProducts.includes(product.id)} // Disable button if product is in disabledProducts
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;