import styled from "styled-components";
import { md, xs } from "theme/breakpoints";

export const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem 1rem;
  /* box-shadow: 0 0 6px 0 rgb(121 121 121 / 16%); */

  .headline {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 800;
    letter-spacing: -0.04rem;
    cursor: pointer;
    width: fit-content;

    &:hover {
      color: ${({ theme }) => theme.secondaryColor};
    }
  }

  .read-text {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 1rem;
    margin: 0;
    cursor: pointer;
    width: fit-content;
  }

  ${md} {
    .headline {
      line-height: 2rem;
    }
  }

  ${xs} {
    .headline {
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
  }
`;
