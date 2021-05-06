import styled from "styled-components";

export const AvailibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .heading {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 3rem;
    font-weight: 800;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .search-section {
    width: fit-content;
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
`;
