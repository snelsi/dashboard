import * as React from "react";
import { CreateGroupCard, CreateGroupModalForm } from "components/Group";

interface CreateGroup {
  desk_id: number;
  index: number;
}
export const CreateGroup: React.FC<CreateGroup> = ({ desk_id, index }) => {
  const [isModalOpen, setModal] = React.useState(false);

  return (
    <>
      <CreateGroupCard onClick={() => setModal(true)} />
      <CreateGroupModalForm
        isOpen={isModalOpen}
        closeModal={() => setModal(false)}
        desk_id={desk_id}
        index={index + 1}
      />
    </>
  );
};
