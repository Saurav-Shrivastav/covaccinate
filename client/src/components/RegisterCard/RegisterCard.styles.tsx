import styled from "styled-components";
import { Button, Input } from "antd";
import { md, xs } from "theme/breakpoints";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 10rem;

  .heading {
    font-size: 900;
    font-size: 2.6rem;
    line-height: 3rem;
    margin: 2rem 0 0 0;
    letter-spacing: -0.5px;

    ${xs} {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }

  .description {
    color: #9c99ac;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1rem;
    margin: 1rem 0 2rem 0;
  }

  .logo-row {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
  }

  .logo-text {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 2.2rem;
    margin: 0 1rem;
    font-weight: 900;
  }

  ${md} {
    padding: 4rem 2rem;
  }

  ${xs} {
    padding: 1rem;
    width: 100vw;
  }
`;

export const VaccineIcon = styled.img`
  height: 3.5rem;
  object-fit: contain;
  align-self: flex-start;
`;

export const StyledInput = styled(Input)`
  height: 65px;
  font-size: 1.2rem;
  border-radius: 50px;
  padding: 1rem 2rem;
  margin: 0 0.5rem 2rem 0;

  &:last-of-type {
    margin-bottom: 3rem;
  }

  ${xs} {
    height: 55px;
    margin-bottom: 1.5rem;

    &:last-of-type {
      margin-bottom: 1.5rem;
    }
  }
`;

export const StyledInputPassword = styled(Input.Password)`
  height: 65px;
  border-radius: 50px;
  padding: 1rem 2rem;
  & .ant-input {
    font-size: 1.2rem;
  }
  margin: 0 0.5rem 2rem 0;

  svg {
    font-size: 1.2rem;
  }

  ${xs} {
    height: 55px;
    margin-bottom: 1.5rem;
  }
`;

export const StyledButton = styled(Button)`
  height: 65px;
  border-radius: 50px;
  font-size: 1.2rem;

  ${xs} {
    height: 55px;
  }
`;
