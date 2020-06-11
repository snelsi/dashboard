import * as React from "react";
import styled from "styled-components";
import { Github } from "@zeit-ui/react-icons";
import { ButtonBase } from "components";

interface GitHubButtonProps {}

const Link = styled.a`
  position: fixed;
  right: 16px;
  bottom: 16px;
  & > div {
    background-color: white;
  }
`;

export const GitHubButton: React.FC<GitHubButtonProps> = () => (
  <Link
    href="https://github.com/snelsi/dashboard"
    target="_blank"
    rel="noreferrer"
  >
    <ButtonBase>
      <Github color="#24292e" />
    </ButtonBase>
  </Link>
);
