import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Col, Row } from "antd";
import { fetchNews } from "services/api";
import Layout from "components/Layout/Layout";
import NewsBox from "components/NewsBox/NewsBox";
import Loading from "pages/Loading/Loading";

import { NewsWrapper } from "./News.styles";

const News: React.FC = () => {
  const { data: news, isLoading: newsLoading } = useQuery(
    "news-data",
    fetchNews,
    {
      cacheTime: 30 * 60 * 1000,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    // * Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (newsLoading) {
    return <Loading />;
  }
  return (
    <Layout>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <NewsWrapper>
            <h1 className="heading">Vaccine News</h1>
            {news?.data.map((item, index) => (
              <NewsBox item={item} key={index} />
            ))}
          </NewsWrapper>
        </Col>
      </Row>
    </Layout>
  );
};

export default News;
