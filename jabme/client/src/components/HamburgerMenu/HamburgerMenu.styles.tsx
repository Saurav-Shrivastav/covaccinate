import styled from "styled-components";
import { md } from "theme/breakpoints";

interface IMenuWrapper {
  isOpen?: boolean;
}

export const MenuWrapper = styled.div<IMenuWrapper>`
  display: none;
  flex-direction: column;
  width: 80vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transform: ${(props) =>
    props.isOpen === true
      ? "translate3d(0, 0, 0)"
      : "translate3d(-100vw, 0, 0)"};
  transition: transform 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  .menu {
    min-height: 100vh;
  }

  ${md} {
    display: flex;
  }
`;
