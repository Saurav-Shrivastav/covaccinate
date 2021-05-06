import React from "react";
import Nav from "components/Nav/Nav";

import { LayoutContainer } from "./Layout.styles";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <div className="nav">
        <Nav />
      </div>
      <div className="main">{children}</div>
    </LayoutContainer>
  );
};

export default Layout;
