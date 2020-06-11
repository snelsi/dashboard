import * as React from "react";
import { Button, Input, Modal, Text, Select } from "@zeit-ui/react";
import styled from "styled-components";

import { useCreateTask } from "utils/hooks";
import type { Status } from "interfaces";

import { Status as StatusTag } from "components/Task";

const Form = styled.form`
  display: grid;
  gap: 1em;
`;

interface CreateTaskModalFormProps {
  isOpen: boolean;
  closeModal: () => void;
  group_id: number;
  index: number;
}

export const CreateTaskModalForm: React.FC<CreateTaskModalFormProps> = ({
  isOpen,
  closeModal,
  group_id,
  index,
}) => {
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<Status>("Planned");

  const [createGroup, { loading, error }] = useCreateTask({
    description,
    status,
    group_id,
    index,
  });

  const createNewDesk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGroup().then(() => {
      setDescription("");
      closeModal();
    });
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Form onSubmit={createNewDesk}>
        <h2>Добавить новую задачу</h2>

        <Input
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="New Group"
          size="large"
          width="100%"
        >
          Описание
        </Input>

        <div>
          <StatusTag data-status={status} />

          <Select
            onChange={(newValue: Status) => setStatus(newValue)}
            initialValue="Planned"
            size="large"
          >
            <Select.Option value="Planned">Planned</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>
        </div>
        {error && <Text type="error">{error.message}</Text>}

        <Button
          type="success-light"
          disabled={!description || loading}
          loading={loading}
          htmlType="submit"
        >
          Создать
        </Button>
      </Form>
    </Modal>
  );
};
