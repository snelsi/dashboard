import * as React from "react";
import { useParams } from "react-router-dom";

import { BackButton, Header, GitHubButton, WorkSpace } from "components";

export const DeskOverview: React.FC = () => {
  const { id } = useParams();

  React.useEffect(() => {
    document.title = `Desk #${id}`;
  }, [id]);

  return (
    <>
      <Header>
        <div>
          <BackButton to="/" />
          <h2>Desk {id}</h2>
        </div>
      </Header>

      <WorkSpace>Desk overview</WorkSpace>
      <GitHubButton />
    </>
  );
};
