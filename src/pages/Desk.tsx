import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useDesk } from "utils/hooks";
import { compareIndex } from "utils/scripts";

import {
  BackButton,
  NotFound404,
  Header,
  GitHubButton,
  WorkSpace,
} from "components";
import { CreateGroup, Group } from "components/Group";
import { DeleteDeskButton, DeskDragContext, DeskName } from "components/Desks";

const Catalog = styled.div`
  display: flex;
  padding: 32px;
  white-space: nowrap;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 16px;
  }
`;

export const DeskOverview: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useDesk(id);

  React.useEffect(() => {
    document.title = data?.desk?.name || `Desk #${id}`;
  }, [id, data]);

  // If loading is false and no data, return 404
  if (!loading && !data?.desk) {
    return <NotFound404 description={error?.message || "Desk is not found"} />;
  }

  return (
    <DeskDragContext id={id}>
      <Header>
        <div>
          <BackButton to="/" />
          {data?.desk ? (
            <DeskName id={data.desk.id} initialName={data.desk.name} />
          ) : (
            <h2>Desk</h2>
          )}
        </div>

        <div>
          {loading && <div>Loading...</div>}
          {data?.desk && (
            <DeleteDeskButton id={id} hide={!(data.desk.groups.length === 0)} />
          )}
        </div>
      </Header>

      <WorkSpace>
        {data?.desk && (
          <Catalog>
            {Array.from(data.desk.groups)
              .sort(compareIndex)
              .map((group) => (
                <Group group={group} key={group.id} />
              ))}
            <CreateGroup desk_id={id} index={data?.desk?.groups.length || 1} />
          </Catalog>
        )}
      </WorkSpace>
      <GitHubButton />
    </DeskDragContext>
  );
};
