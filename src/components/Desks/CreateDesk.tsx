import * as React from "react";
import { CreateDeskCard, CreateDeskModalForm } from "components/Desks";

interface CreateDeskProps {
  index: number;
}
export const CreateDesk: React.FC<CreateDeskProps> = ({ index }) => {
  const [isModalOpen, setModal] = React.useState(false);

  return (
    <>
      <CreateDeskCard onClick={() => setModal(true)} />
      <CreateDeskModalForm
        isOpen={isModalOpen}
        closeModal={() => setModal(false)}
        index={index + 1}
      />
    </>
  );
};
