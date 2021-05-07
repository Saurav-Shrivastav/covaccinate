import styled from "styled-components";
import { lg, mdxl } from "theme/breakpoints";

export const AvailibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .heading {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 3rem;
    font-weight: 800;
  }

  .heading-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .cowin {
    align-self: center;
  }

  ${mdxl},
  ${lg} {
    .cowin {
      display: none;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .search-section {
    display: flex;
    width: 100%;
    /* justify-content: space-between; */
  }

  .filter-dropdown {
    width: 250px;
    margin: 0 1rem;

    &:first-of-type {
      margin-left: 0;
    }
  }

  .filter-search {
    width: 250px;
    margin-right: 1rem;
  }

  .date-picker {
    margin-right: 1rem;
    width: 250px;
  }

  ${mdxl},
  ${lg} {
    flex-direction: column;
    justify-content: center;

    .search-section {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .filter-dropdown,
    .filter-search,
    .date-picker {
      width: 100%;
      margin: 0.5rem auto;
    }

    .date-picker {
      margin-bottom: 1.5rem;
    }
  }
`;
