import styled from "styled-components";
import { Input, FormItem } from "formik-antd";
import { sm, xs } from "theme/breakpoints";

export const UnsubscribeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin: auto;
    color: ${({ theme }) => theme.secondaryColor};
    font-weight: 800;
    font-size: 2rem;

    ${sm} {
      font-size: 1.8rem;
      line-height: 1.6rem;
    }
    ${xs} {
      font-size: 1.4rem;
      line-height: 1.6rem;
    }
  }

  img {
    margin-top: 1rem;
    object-fit: contain;
    height: 500px;
    border-radius: 20px;

    ${xs},
    ${sm} {
      height: 300px;
      width: 100%;
      margin: 1rem auto;
    }
  }

  .form {
    display: flex;
    margin: 3rem auto;
    width: 100%;
    justify-content: center;

    ${xs} {
      flex-direction: column;
    }
  }

  .submit {
    margin-left: 0.5rem;

    ${xs} {
      margin-left: 0;
    }
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  margin: auto;
`;

export const StyledFormItem = styled(FormItem)`
  display: flex;
  justify-content: center;
  width: 60%;

  @media only screen and (max-width: 1600px) {
    width: 30%;
  }

  ${sm} {
    width: 100%;
  }

  ${xs} {
    width: 100%;
  }
`;
