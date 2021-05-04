import React from "react";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import {
  Card,
  StyledInput,
  VaccineIcon,
  StyledInputPassword,
  StyledButton,
} from "./RegisterCard.styles";
import syringe from "../../assets/syringe.png";

const RegisterCard: React.FC = () => {
  return (
    <Card>
      <div className="logo-row">
        <VaccineIcon src={syringe} alt="syringe" />
        <h2 className="logo-text">Jab.Me</h2>
      </div>
      <h3 className="heading">Register</h3>
      <p className="description">
        Get notified about vaccine's availabilty in your area and much more
      </p>
      <StyledInput placeholder="Name" />
      <StyledInput placeholder="Email Address" />
      <StyledInputPassword
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <StyledInput placeholder="Zipcode" />
      <StyledButton type="primary">Register</StyledButton>
    </Card>
  );
};

export default RegisterCard;
