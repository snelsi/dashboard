import * as React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useDeleteDesk } from "utils/hooks";

import { TrashButton } from "components";

const DeleteButton = styled.div`
  transition: all 0.2s ease-out;

  opacity: 0;

  &[data-hidden="false"] {
    opacity: 1;
  }
`;

interface DeleteDeskProps {
  id: number;
  hide?: boolean;
}

export const DeleteDeskButton: React.FC<DeleteDeskProps> = ({
  id,
  hide = false,
}) => {
  const history = useHistory();
  const [deleteDesk, { loading }] = useDeleteDesk(id);

  const deleteThisDesk = () => {
    deleteDesk().then(() => history.push("/"));
  };

  return (
    <DeleteButton data-hidden={hide}>
      <TrashButton
        onClick={() => deleteThisDesk()}
        disabled={hide || loading}
      />
    </DeleteButton>
  );
};
