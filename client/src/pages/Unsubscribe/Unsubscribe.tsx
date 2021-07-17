import React from "react";
import Layout from "components/Layout/Layout";
import { Button, Col, message, notification, Row } from "antd";
import { Formik, FormikProps } from "formik";
import { Form } from "formik-antd";
import { useMutation } from "react-query";
import { unsubsribeByEmail } from "services/api";
import { UnsubscribeSchema } from "utils/UnsubscribeSchema";

import {
  UnsubscribeWrapper,
  StyledInput,
  StyledFormItem,
} from "./Unsubscribe.styles";
import happyVaccine from "../../assets/happyVaccine.jpg";

interface FormValues {
  email: string;
}

interface OtherProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid: boolean;
}

const initialValues: FormValues = {
  email: "",
};

const Unsubscribe: React.FC = () => {
  const { isLoading, mutate } = useMutation(
    (email: string) => unsubsribeByEmail(email),
    {
      onSuccess: (data: string) => {
        notification.success({
          message: data,
          placement: "bottomRight",
        });
      },
      onError: (err) => {
        console.log(err);
        notification.error({
          message: "Something went wrong",
          description: "Please try again later",
          placement: "bottomRight",
        });
      },
    }
  );
  const onSubmit = (formik: OtherProps & FormikProps<FormValues>): void => {
    const { handleSubmit, isValid } = formik;
    if (!isValid) {
      message.error("Please fill all the details correctly", 2);
    } else {
      handleSubmit();
    }
  };

  return (
    <Layout>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
          <UnsubscribeWrapper>
            <h1>
              Thank you for using Covaccinate! We hope, we could be of help!
            </h1>
            <img src={happyVaccine} alt="Happy Vaccine" />
            <Formik
              initialValues={initialValues}
              validationSchema={UnsubscribeSchema}
              onSubmit={(values) => {
                mutate(values.email);
              }}
            >
              {(props) => {
                const { email } = props.values;

                return (
                  <Form className="form">
                    <StyledFormItem name="email">
                      <StyledInput
                        placeholder="Enter your registered email"
                        value={email}
                        size="large"
                        name="email"
                        onChange={props.handleChange}
                      />
                    </StyledFormItem>
                    <Button
                      type="primary"
                      size="large"
                      className="submit"
                      onClick={() => {
                        onSubmit(props);
                      }}
                      loading={isLoading}
                    >
                      Unsubscribe
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </UnsubscribeWrapper>
        </Col>
      </Row>
    </Layout>
  );
};

export default Unsubscribe;
