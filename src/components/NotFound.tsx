import * as React from "react";
import styled from "styled-components";

const NotFound = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

interface NotFound404Props {
  description?: string;
}

export const NotFound404: React.FC<NotFound404Props> = ({
  description = "Page is not found",
}) => (
  <NotFound>
    <h1>404 | {description}</h1>
    <a href="/">Return to main page</a>
  </NotFound>
);
