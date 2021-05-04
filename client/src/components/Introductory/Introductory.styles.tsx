import styled from "styled-components";
import background from "../../assets/Liquid-Cheese.svg";

export const IntroductoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: fixed;
  padding: 4rem;
`;

export const StyledImage = styled.img`
  height: 300px;
  object-fit: contain;
`;

export const StyledHeading = styled.h2`
  font-weight: 600;
  font-size: 2.2rem;
  color: #fff;
  margin: 2rem 0;
  text-align: center;
  max-width: 60%;
`;
