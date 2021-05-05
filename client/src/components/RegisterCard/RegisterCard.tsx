import React from "react";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { Formik, FormikProps } from "formik";
import { message } from "antd";
import { Form } from "formik-antd";
import { RegistrationSchema } from "utils/RegisterSchema";

import {
  Card,
  StyledInput,
  VaccineIcon,
  StyledInputPassword,
  StyledButton,
  StyledSelect,
  StyledFormItem,
} from "./RegisterCard.styles";
import syringe from "../../assets/syringe.png";

interface FormValues {
  name: string;
  email: string;
  password: string;
  category: string;
  zipcode: string;
}

interface OtherProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid: boolean;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  category: "",
  zipcode: "",
};

const RegisterCard: React.FC = () => {
  const onSubmit = (formik: OtherProps & FormikProps<FormValues>): void => {
    const { handleSubmit, isValid } = formik;
    if (!isValid) {
      message.error("Please fill all the details correctly", 2);
    } else {
      handleSubmit();
    }
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => {
          const { name, password, email, category, zipcode } = props.values;

          return (
            <>
              <Form>
                <StyledFormItem name="name">
                  <StyledInput
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={props.handleChange}
                  />
                </StyledFormItem>
                <StyledFormItem name="email">
                  <StyledInput
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={props.handleChange}
                  />
                </StyledFormItem>
                <StyledFormItem name="password">
                  <StyledInputPassword
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={props.handleChange}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </StyledFormItem>
                <StyledFormItem name="category">
                  <StyledSelect
                    name="category"
                    value={category}
                    onChange={props.handleChange}
                    size="large"
                  >
                    <Option value="" disabled>
                      Select an age category
                    </Option>
                    <Option value="18-45">18-45</Option>
                    <Option value="45+">45+</Option>
                  </StyledSelect>
                </StyledFormItem>
                <StyledFormItem name="zipcode">
                  <StyledInput
                    name="zipcode"
                    value={zipcode}
                    onChange={props.handleChange}
                    placeholder="Zipcode"
                  />
                </StyledFormItem>
              </Form>
              <StyledButton
                type="primary"
                onClick={() => {
                  onSubmit(props);
                }}
              >
                Register
              </StyledButton>
            </>
          );
        }}
      </Formik>
    </Card>
  );
};

export default RegisterCard;
