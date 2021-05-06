import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import Layout from "components/Layout/Layout";
import { LoadingWrapper } from "./Loading.styles";

const Loading: React.FC = () => {
  return (
    <Layout>
      <LoadingWrapper>
        <LoadingOutlined />
      </LoadingWrapper>
    </Layout>
  );
};

export default Loading;
