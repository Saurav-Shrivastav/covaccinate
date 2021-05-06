import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import { NavContainer, NavIcon } from "./Nav.styles";
import syringe from "../../assets/syringe.png";

const Nav: React.FC = () => {
  const { push } = useHistory();

  return (
    <NavContainer>
      <div className="logo-row">
        <NavIcon src={syringe} alt="syringe" />
        <h2 className="logo-text">Jab.Me</h2>
      </div>
      <div className="action-container">
        <Button type="primary" ghost className="news">
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
    </NavContainer>
  );
};

export default Nav;
