import { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: "Lato", sans-serif;
    transition: all 0.25s linear;
    overflow-x: hidden;
  }
  `;
