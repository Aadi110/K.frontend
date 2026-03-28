import React, { createContext, useState, useContext } from 'react';
import { crops } from '../data/crops';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [marketCrops, setMarketCrops] = useState(crops);

  const addProduct = (newProduct, farmerName = "Unknown Farmer") => {
    const maxId = Math.max(...marketCrops.map(c => c.id), 0);
    const productWithId = { 
      ...newProduct, 
      id: maxId + 1,
      farmer_name: farmerName 
    };
    setMarketCrops([...marketCrops, productWithId]);
    return productWithId;
  };

  const deleteProduct = (id) => {
    setMarketCrops(marketCrops.filter(p => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setMarketCrops(marketCrops.map(p => (p.id === id ? updatedProduct : p)));
  };

  const getFarmerProducts = (farmerName) => {
    return marketCrops.filter(p => p.farmer_name === farmerName);
  };

  return (
    <MarketplaceContext.Provider value={{ marketCrops, setMarketCrops, addProduct, deleteProduct, updateProduct, getFarmerProducts }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
};
