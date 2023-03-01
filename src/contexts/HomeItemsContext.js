import React, { createContext, useState } from 'react';

// Crea il contesto
const HomeItemsContext = createContext();

// Crea un provider del contesto
function HomeItemsProvider({ children }) {
  // Inizializza lo stato
  const [homeItems, setHomeItems] = useState([]);

//aggiorno gli Items nella home 
  const updateHomeItems = (items) =>{
    setHomeItems(items);
  }

  return (
    <HomeItemsContext.Provider value={{ homeItems, updateHomeItems }}>
      {children}
    </HomeItemsContext.Provider>
  );
}

export { HomeItemsContext, HomeItemsProvider };