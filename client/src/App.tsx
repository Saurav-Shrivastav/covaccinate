import React, { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import HamburgerProvider from "context/HamburgerContext";
import { GlobalStyles } from "theme/global";
import { lightTheme } from "theme/theme";
import { getToken, onMessageListener } from "services/firebase-init";
import { FcmTokenContext } from "context/FcmTokenContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const App: React.FC = () => {
  const [, setTokenFound] = useState<boolean>(false);
  const { setToken } = useContext(FcmTokenContext);
  useEffect(() => {
    getToken(setTokenFound, setToken);
    // eslint-disable-next-line
  }, []);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <HamburgerProvider>
          <GlobalStyles />
          <div className="app">
            <Router>
              <Routes />
            </Router>
          </div>
        </HamburgerProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
