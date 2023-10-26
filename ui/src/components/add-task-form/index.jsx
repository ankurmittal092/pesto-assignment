import React from "react";
import { Form, Input, InputNumber } from "antd";

export const AddTaskForm = ({ form, defaultValues = {} }) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="task_form"
        initialValues={defaultValues}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of the task!",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="storyPoints"
          label="Story Points"
          className="collection-create-form_last-form-item"
        >
          <InputNumber placeholder="Story Points" />
        </Form.Item>
      </Form>
    </div>
  );
};
