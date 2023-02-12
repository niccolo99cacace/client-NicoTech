import React, { createContext, useState } from 'react';

// Crea il contesto
const CartCountContext = createContext();

// Crea un provider del contesto
function CartCountProvider({ children }) {
  // Inizializza lo stato
  const [cartCount, setCartCount] = useState(0);

  // aggiunta item al carrellino
  const addToCart = () => {
    setCartCount(count => count + 1);
  };

// leva item dal carrellino
  const decToCart= () => {
    setCartCount(count => count - 1);
  };

  return (
    <CartCountContext.Provider value={{ cartCount, addToCart, decToCart }}>
      {children}
    </CartCountContext.Provider>
  );
}

export { CartCountContext, CartCountProvider };