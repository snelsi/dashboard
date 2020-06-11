import * as React from "react";

import { GitHubButton, Header, WorkSpace } from "components";

export const Desks: React.FC = () => {
  React.useEffect(() => {
    document.title = "Desks";
  }, []);

  return (
    <>
      <Header>
        <h1>Desks</h1>
      </Header>

      <WorkSpace>Desks Catalog</WorkSpace>
      <GitHubButton />
    </>
  );
};
