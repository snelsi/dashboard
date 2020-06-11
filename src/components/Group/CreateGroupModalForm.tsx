import * as React from "react";
import { Button, Input, Modal, Text } from "@zeit-ui/react";
import styled from "styled-components";

import { useCreateGroup } from "utils/hooks";

const Form = styled.form`
  display: grid;
  gap: 1em;
`;

interface CreateGroupModalFormProps {
  isOpen: boolean;
  closeModal: () => void;
  desk_id: number;
  index: number;
}

export const CreateGroupModalForm: React.FC<CreateGroupModalFormProps> = ({
  isOpen,
  closeModal,
  desk_id,
  index,
}) => {
  const [name, setName] = React.useState("");

  const [createGroup, { loading, error }] = useCreateGroup({
    name,
    desk_id,
    index,
  });

  const createNewGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGroup().then(() => {
      setName("");
      closeModal();
    });
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Form onSubmit={createNewGroup}>
        <h2>Добавить новую группу</h2>

        <Input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Group"
          size="large"
          width="100%"
        >
          Название
        </Input>

        {error && <Text type="error">{error.message}</Text>}

        <Button
          type="success-light"
          disabled={!name || loading}
          loading={loading}
          htmlType="submit"
        >
          Создать
        </Button>
      </Form>
    </Modal>
  );
};
