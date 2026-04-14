import { createContext, useState, useCallback } from 'react';
import http from '../lib/http';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRemoveShowed, setIsRemoveShowed] = useState(true);
  const [showAddMenu, setShowAddMenu] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const fetchCartFromAPI = useCallback(async (token) => {
    if (!token) {
      setLoading(false);
      return;
    }

    setUserToken(token);
    setLoading(true);
    setError(null);
    try {
      const response = await http('/cart', null, { token });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      const cartItems = data.data?.items || [];
      const formattedCart = (Array.isArray(cartItems) ? cartItems : []).map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity,
        size_id: item.size_id,
        size_name: item.size_name,
        variant_id: item.variant_id,
        variant_name: item.variant_name,
        image: item.image,
        subtotal: item.subtotal
      }));
      setItems(formattedCart);
      localStorage.setItem('cart', JSON.stringify(formattedCart));
    } catch (err) {
      console.error('Error fetching cart from API:', err);
      setError('Failed to load cart');
      const cartFromStorage = localStorage.getItem('cart');
      if (cartFromStorage) {
        try {
          setItems(JSON.parse(cartFromStorage));
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          setItems([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (itemId) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });

    if (userToken) {
      try {
        const response = await http(`/cart/${itemId}`, null, { 
          token: userToken, 
          method: 'DELETE' 
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        console.log('Item removed from API');
      } catch (error) {
        console.error('Error removing item from API:', error);
        setError('Failed to sync removal with server');
      }
    }
  }, [userToken]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
    setUserToken(null);
  };

  const value = {
    items,
    setItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartFromAPI,
    isRemoveShowed,
    setIsRemoveShowed,
    showAddMenu,
    setShowAddMenu,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export default CartCtx;