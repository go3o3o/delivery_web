import React, { createContext, useContext } from "react";
import AddressStore from "../stores/AddressStore";

const addressStore = new AddressStore();

const StoreContext = createContext({
  addressStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ addressStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);
