import React from "react";

import {
  IntroductoryWrapper,
  StyledHeading,
  StyledImage,
} from "./Introductory.styles";
import vaccinationImg from "../../assets/vaccination.svg";

const Introductory: React.FC = () => {
  return (
    <IntroductoryWrapper>
      <StyledImage src={vaccinationImg} alt="vaccination" />
      <StyledHeading>
        Get notified regarding vaccine's availablity and much more
      </StyledHeading>
    </IntroductoryWrapper>
  );
};

export default Introductory;
