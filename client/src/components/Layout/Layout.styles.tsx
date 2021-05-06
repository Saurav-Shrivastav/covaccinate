import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  .nav {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 2000;
  }
  .main {
    width: 100%;
    margin-top: 70px;
    padding: 1rem;
  }
`;
