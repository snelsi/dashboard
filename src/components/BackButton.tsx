import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@zeit-ui/react-icons";
import { ButtonBase } from "components";

interface BackButtonProps {
  to: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to }) => (
  <Link to={to}>
    <ButtonBase>
      <ChevronLeft color="#393C44" />
    </ButtonBase>
  </Link>
);
