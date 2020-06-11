import * as React from "react";
import { CreateTaskButton, CreateTaskModalForm } from "components/Task";

interface CreateTask {
  group_id: number;
  index: number;
}
export const CreateTask: React.FC<CreateTask> = ({ group_id, index }) => {
  const [isModalOpen, setModal] = React.useState(false);

  return (
    <>
      <CreateTaskButton onClick={() => setModal(true)} />
      <CreateTaskModalForm
        isOpen={isModalOpen}
        closeModal={() => setModal(false)}
        group_id={group_id}
        index={index + 1}
      />
    </>
  );
};
