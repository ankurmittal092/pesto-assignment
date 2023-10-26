import React, { useState } from "react";
import { AddTaskForm } from "../add-task-form";
import { Modal, Form, Spin } from "antd";

export const AddOrUpdateTaskModal = ({
  isOpen,
  setModalOpen,
  isEditMode,
  data = {},
  onSubmit = async () => {},
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      style={{ top: 20 }}
      open={isOpen}
      destroyOnClose
      maskClosable={false}
      onOk={() => {
        if (loading) {
          return;
        }

        form
          .validateFields()
          .then((values) => {
            setLoading(true);
            onSubmit(values).then(() => {
              setLoading(false);
              form.resetFields();
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => setModalOpen(false)}
    >
      <Spin spinning={loading}>
        <AddTaskForm onSubmit={console.log} form={form} defaultValues={data} />
      </Spin>
    </Modal>
  );
};
