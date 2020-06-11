import * as React from "react";
import styled from "styled-components";
import { Button } from "@zeit-ui/react";
import { Trash2 } from "@zeit-ui/react-icons";

const Wrapper = styled.div`
  transition: all 0.2s ease-out;

  & > button {
    display: flex !important;
    align-items: center !important;
    border: none !important;
    height: 40px !important;
    width: 40px !important;
    padding: 0 !important;

    &:hover {
      border: none !important;
    }

    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
    &:focus {
      border: 1px solid black !important;
    }
  }

  & > button:not(:hover) {
    background: none !important;
  }
`;

interface TrashButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
export const TrashButton: React.FC<TrashButtonProps> = (props) => (
  <Wrapper className="trashButton">
    <Button {...props} auto>
      <Trash2 color="red" />
    </Button>
  </Wrapper>
);
