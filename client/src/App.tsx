import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "theme/global";
import { lightTheme } from "theme/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <div className="app">
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
