import React from "react";
import { INewsObject } from "services/api";

import { NewsCard } from "./NewsBox.styles";

interface IProps {
  item: INewsObject;
}

const NewsBox: React.FC<IProps> = ({ item }) => {
  return (
    <NewsCard>
      <h3
        className="headline"
        onClick={() => {
          window.open(`${item.link}`);
        }}
      >
        {item.headline}
      </h3>
      <p
        className="read-text"
        onClick={() => {
          window.open(`${item.link}`);
        }}
      >
        Read &rarr;
      </p>
    </NewsCard>
  );
};

export default NewsBox;
