import styled from "styled-components";
import type { Status as IStatus } from "interfaces";

interface StatusProps {
  "data-status": IStatus;
}

export const Status = styled.div<StatusProps>`
  background-color: #51e898;
  border-radius: 4px;
  height: 8px;
  margin: 0 4px 4px 0;
  width: 40px;

  &[data-status="planned" i] {
    background-color: #6287ff;
  }
  &[data-status="done" i] {
    background-color: #ff3131;
  }
`;
