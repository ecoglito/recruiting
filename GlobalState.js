import React from "react";
import { useState } from "react";

export const GlobalStateContext = React.createContext();


export const GlobalStateProvider = ({ children }) => {
  const [isPortfolioCompany, setIsPortfolioCompany] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isPortfolioCompany, setIsPortfolioCompany }}>
      {children}
    </GlobalStateContext.Provider>
  );
};