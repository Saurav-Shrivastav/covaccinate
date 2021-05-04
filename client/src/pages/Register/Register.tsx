import React from "react";
import { Col, Row } from "antd";
import Introductory from "components/Introductory/Introductory";
import RegisterCard from "components/RegisterCard/RegisterCard";
import { Wrapper } from "./Register.styles";

const Register: React.FC = () => {
  return (
    <Wrapper>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <RegisterCard />
        </Col>
        <Col lg={12} className="intro">
          <Introductory />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Register;
