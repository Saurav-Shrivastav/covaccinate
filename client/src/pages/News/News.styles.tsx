import styled from "styled-components";

export const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .heading {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 3rem;
    font-weight: 800;
  }
`;
