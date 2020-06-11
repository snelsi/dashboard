import * as React from "react";
import { useCreateDesk } from "utils/hooks";
import { Button, Input, Modal, Text } from "@zeit-ui/react";
import styled from "styled-components";

const Form = styled.form`
  display: grid;
  gap: 1em;
`;

interface CreateDeskModalFormProps {
  isOpen: boolean;
  closeModal: () => void;
  index: number;
}

export const CreateDeskModalForm: React.FC<CreateDeskModalFormProps> = ({
  isOpen,
  closeModal,
  index,
}) => {
  const [name, setName] = React.useState("");

  const [createDesk, { loading, error }] = useCreateDesk({ name, index });

  const createNewDesk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDesk().then(() => {
      setName("");
      closeModal();
    });
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Form onSubmit={createNewDesk}>
        <h2>Добавить новую доску</h2>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Desk"
          size="large"
          width="100%"
        >
          Доска
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
