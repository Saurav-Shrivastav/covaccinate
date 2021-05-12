import styled from "styled-components";
import { lg } from "theme/breakpoints";

export const Wrapper = styled.div`
  .intro {
    position: fixed;
    top: 0;
    right: 0;
    ${lg} {
      display: none;
    }
  }
`;
