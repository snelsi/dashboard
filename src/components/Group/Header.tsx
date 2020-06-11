import * as React from "react";
import styled from "styled-components";
import { useThrottle } from "react-use";

import type { IGroup } from "interfaces";
import { useGroupName, useDeleteGroup } from "utils/hooks";

import { Input, TrashButton } from "components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 8px;
`;

interface HeaderProps {
  group: IGroup;
}

export const Header: React.FC<HeaderProps> = ({ group }) => {
  const [currentName, setName] = React.useState(group.name);
  const debouncedName = useThrottle(currentName);
  const [updateName] = useGroupName({ id: group.id, name: currentName });
  const [deleteGroup, { loading }] = useDeleteGroup(group.id);

  React.useEffect(() => {
    if (debouncedName && group.name !== debouncedName) {
      updateName();
    }
  }, [group, debouncedName, updateName]);

  return (
    <Wrapper>
      <Input
        value={currentName}
        onChange={(newValue) => setName(newValue.target.value)}
      />
      {group.tasks.length === 0 && (
        <TrashButton onClick={() => deleteGroup()} disabled={loading} />
      )}
    </Wrapper>
  );
};
