import React, { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
// @ts-ignore
export const FcmTokenContext = createContext<IContext>();

const FcmTokenProvider: React.FC<IProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <FcmTokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </FcmTokenContext.Provider>
  );
};

export default FcmTokenProvider;
