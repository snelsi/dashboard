import * as React from "react";
import { Button, Input, Modal, Text, Select } from "@zeit-ui/react";
import styled from "styled-components";

import type { Status } from "interfaces";
import { useUpdateTask, useDeleteTask } from "utils/hooks";

import { TrashButton } from "components";
import { Status as StatusTag } from "components/Task";

const Form = styled.form`
  display: grid;
  gap: 1em;

  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

interface CreateTaskModalFormProps {
  isOpen: boolean;
  initialDescription: string;
  initialStatus: Status;
  closeModal: () => void;
  id: number;
}

export const EditTaskModalForm: React.FC<CreateTaskModalFormProps> = ({
  isOpen,
  closeModal,
  id,
  initialDescription = "",
  initialStatus = "Planned",
}) => {
  const [description, setDescription] = React.useState(initialDescription);
  const [status, setStatus] = React.useState<Status>(initialStatus);

  const [updateTask, { loading, error }] = useUpdateTask({
    id,
    description,
    status,
  });
  const [deleteTask] = useDeleteTask(id);

  const onClose = () => {
    setDescription(initialDescription);
    setStatus(initialStatus);
    closeModal();
  };

  const createNewDesk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask().then(() => {
      closeModal();
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Form onSubmit={createNewDesk}>
        <div className="header">
          <h2>Редактировать задачу</h2>
          <TrashButton onClick={() => deleteTask()} />
        </div>

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
            initialValue={initialStatus}
            size="large"
            width="100%"
          >
            <Select.Option value="Planned">Planned</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
            <Select.Option value="Failed">Failed</Select.Option>
          </Select>
        </div>
        {error && <Text type="error">{error.message}</Text>}

        <Button
          type="success-light"
          disabled={!description || loading}
          loading={loading}
          htmlType="submit"
        >
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
};
