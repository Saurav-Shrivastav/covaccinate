import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Option } from "antd/lib/mentions";
import { Formik, FormikProps } from "formik";
import { Button, message, notification } from "antd";
import { Form } from "formik-antd";
import { useHistory } from "react-router-dom";
import { RegistrationSchema } from "utils/RegisterSchema";
import Loading from "pages/Loading/Loading";
import { getToken } from "services/firebase-init";

import {
  fetchDistricts,
  fetchStates,
  IStatesData,
  registerUser,
} from "services/api";

import {
  Card,
  StyledInput,
  VaccineIcon,
  StyledButton,
  StyledSelect,
  StyledFormItem,
  Header,
} from "./RegisterCard.styles";
import syringe from "../../assets/syringe.png";
import { FcmTokenContext } from "context/FcmTokenContext";
import Modal from "antd/lib/modal/Modal";

interface FormValues {
  name: string;
  email: string;
  category: string;
  zipcode: string;
  state: string;
  district: string;
}

interface OtherProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isValid: boolean;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  category: "",
  zipcode: "",
  state: "",
  district: "",
};

const RegisterCard: React.FC = () => {
  const { push } = useHistory();
  const { token, setToken } = useContext(FcmTokenContext);
  const formData = new FormData();
  const [districtName, setDistrictName] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [, setTokenFound] = useState<boolean>(false);
  const { data: states, isLoading: statesLoading } = useQuery<IStatesData>(
    "state-data",
    fetchStates,
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: Infinity,
    }
  );
  const {
    data: districts,
    isLoading: districtsLoading,
    mutate: districtMutation,
  } = useMutation((id: string) => fetchDistricts(parseInt(id)));

  const { isLoading: registerLoading, mutate: registerMutation } = useMutation(
    (formData: FormData) => registerUser(formData),
    {
      onSuccess: (data: string) => {
        notification.success({
          message: data,
          description:
            "Sit back and Relax! We will notify you regarding the vaccine's availability ",
        });
      },
      onError: (err) => {
        console.log(err);
        notification.error({
          message: "Something went wrong",
          description: "Please try again later",
        });
      },
    }
  );

  const handleStatesChange = (
    value: string,
    formik: FormikProps<FormValues>
  ): void => {
    const { handleChange } = formik;
    handleChange(value);
    districtMutation(value);
  };

  const handleDistrictsChange = (
    value: string,
    option: any,
    formik: FormikProps<FormValues>
  ): void => {
    const { handleChange } = formik;
    handleChange(value);
    setDistrictName(option?.children);
  };

  const handleOk = (formik: FormikProps<FormValues>): void => {
    const { handleSubmit } = formik;
    handleSubmit();
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(setTokenFound, setToken);
      }
    });
  };

  const onSubmit = (formik: OtherProps & FormikProps<FormValues>): void => {
    const { handleSubmit, isValid } = formik;
    if (!isValid) {
      message.error("Please fill all the details correctly", 2);
    }
    if (!token) {
      setIsModalVisible(true);
    } else {
      handleSubmit();
    }
  };

  if (statesLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header>
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
            push("/availability");
          }}
        >
          Check Vaccine Availablity
        </Button>
      </Header>
      <Card>
        <div className="logo-row">
          <VaccineIcon src={syringe} alt="syringe" />
          <h2 className="logo-text">Jab.Me</h2>
        </div>
        <h3 className="heading">Register</h3>
        <p className="description">
          Get notified about vaccine's availabilty in your area
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={RegistrationSchema}
          onSubmit={(values) => {
            const { email, name, zipcode, district, category } = values;
            formData.append("email", email);
            formData.append("name", name);
            formData.append("pincode", zipcode);
            formData.append("district", districtName);
            formData.append("district_id", district);
            formData.append("category", category);
            token && formData.append("fcm_token", token);
            registerMutation(formData);
          }}
        >
          {(props) => {
            const {
              name,
              email,
              category,
              zipcode,
              state,
              district,
            } = props.values;

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
                  <StyledFormItem name="state">
                    <StyledSelect
                      name="state"
                      value={state}
                      onChange={(value: string) => {
                        handleStatesChange(value, props);
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option?.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option?.value
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="" disabled>
                        Select a state
                      </Option>
                      {states?.states.map((stateItem) => (
                        <Option value={stateItem.state_id.toString()}>
                          {stateItem.state_name}
                        </Option>
                      ))}
                    </StyledSelect>
                  </StyledFormItem>
                  <StyledFormItem name="district">
                    <StyledSelect
                      name="district"
                      value={district}
                      onChange={(value: string, option) => {
                        handleDistrictsChange(value, option, props);
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option?.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0 ||
                        option?.value
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="" disabled>
                        Select a district
                      </Option>
                      {districtsLoading && (
                        <Option value="loading" disabled>
                          Fetching districts
                        </Option>
                      )}
                      {districts?.districts.map((districtItem) => (
                        <Option value={districtItem.district_id.toString()}>
                          {districtItem.district_name}
                        </Option>
                      ))}
                    </StyledSelect>
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
                      <Option value="18-44">18-44</Option>
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
                  loading={registerLoading}
                >
                  Register
                </StyledButton>
                <Modal
                  title="Confirmation"
                  visible={isModalVisible}
                  onOk={() => {
                    handleOk(props);
                  }}
                  onCancel={() => {
                    handleCancel();
                  }}
                  cancelText="Enable Notification"
                  okText="Register anyways"
                >
                  <p>
                    You have not enabled notfications for this app. If you
                    proceed with the registration, you will not be able to
                    receive push notifications regarding vaccine availabilty.
                    You would only be notfied through mail.
                  </p>
                </Modal>
              </>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};

export default RegisterCard;
