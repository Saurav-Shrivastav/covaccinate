import styled from "styled-components";
import { VaccineIcon } from "components/RegisterCard/RegisterCard.styles";
import { md, xs } from "theme/breakpoints";

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.body};
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  height: 70px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  .logo-row {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
    height: 100%;
  }

  .logo-text {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 1.5rem;
    margin: 0 1rem;
    font-weight: 900;

    ${xs} {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }

  .action-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  .news {
    margin-right: 1rem;
  }

  .hamburger {
    display: none;
  }

  ${md} {
    justify-content: stretch;
    .action-container {
      display: none;
    }

    .hamburger {
      display: flex;
      align-self: center;
      margin-right: 1rem;

      svg {
        font-size: 1.4rem;
        color: grey;
      }
    }
  }
`;

export const NavIcon = styled(VaccineIcon)`
  height: 2.6rem;
  margin: auto;
`;
