import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { HamburgerContext } from "context/HamburgerContext";
import { MenuOutlined } from "@ant-design/icons";
import HamburgerMenu from "components/HamburgerMenu/HamburgerMenu";

import { NavContainer, NavIcon } from "./Nav.styles";
import syringe from "../../assets/syringe.png";

const Nav: React.FC = () => {
  const { push } = useHistory();
  const { setIsVisible } = useContext(HamburgerContext);

  return (
    <NavContainer>
      <div className="hamburger">
        <MenuOutlined
          onClick={() => {
            setIsVisible(true);
          }}
        />
      </div>
      <div
        className="logo-row"
        onClick={() => {
          push("/");
        }}
      >
        <NavIcon src={syringe} alt="syringe" />
        <h2 className="logo-text">Jab.Me</h2>
      </div>
      <div className="action-container">
        <Button
          type="primary"
          ghost
          className="news"
          onClick={() => {
            push("/news");
          }}
        >
          Vaccine News
        </Button>
        <Button
          type="primary"
          onClick={() => {
            push("/");
          }}
        >
          Register for alerts
        </Button>
      </div>
      <HamburgerMenu />
    </NavContainer>
  );
};

export default Nav;
