import React, { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
// @ts-ignore
export const HamburgerContext = createContext<IContext>();

const HamburgerProvider: React.FC<IProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <HamburgerContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </HamburgerContext.Provider>
  );
};

export default HamburgerProvider;
