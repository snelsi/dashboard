import styled from "styled-components";

export const Header = styled.div`
  background-color: #fff;
  border: 1px solid #e8e8ef;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  overflow: auto;

  & > div {
    align-items: center;
    display: flex;
  }
  & > div.left {
    width: 100%;
    & > input {
      max-width: 400px;
      width: fill-available;
    }
  }
  & > div.right {
    width: fit-content;
  }
`;
