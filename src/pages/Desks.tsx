import * as React from "react";

import { useDesks } from "utils/hooks";
import { compareIndex } from "utils/scripts";

import { GitHubButton, Header, WorkSpace } from "components";
import { DesksCatalog, Desk, DesksDragContext } from "components/Desks";

export const Desks: React.FC = () => {
  const { data, loading, error } = useDesks();

  React.useEffect(() => {
    document.title = "Desks";
  }, []);

  return (
    <DesksDragContext>
      <Header>
        <h1>Desks</h1>
        {(error && <div>{error.message}</div>) ||
          (loading && <div>Loading...</div>)}
      </Header>

      <WorkSpace>
        {data?.desks && (
          <DesksCatalog numberOfDesks={data.desks.length}>
            {Array.from(data.desks)
              .sort(compareIndex)
              .map((desk) => (
                <Desk desk={desk} key={desk.id} />
              ))}
          </DesksCatalog>
        )}
      </WorkSpace>
      <GitHubButton />
    </DesksDragContext>
  );
};
