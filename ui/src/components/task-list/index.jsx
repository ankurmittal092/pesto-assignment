import React, { useEffect } from "react";
import { Table, Select, Tag, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
const STATUS = [
  {
    label: "To Do",
    value: "todo",
    color: "grey",
  },
  {
    label: "In Progress",
    value: "in_progress",
    color: "blue",
  },
  {
    label: "Done",
    value: "done",
    color: "green",
  },
];

const tagRender = (props) => {
  const { label, color, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const TaskList = ({
  onDelete = () => {},
  onStatusChange = () => {},
  data = [],
}) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Story Points",
      dataIndex: "storyPoints",
      defaultSortOrder: "descend",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: STATUS.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      onFilter: (value, record) => record.status === value,
      render: (value, record) => {
        return (
          <Select
            tagRender={tagRender}
            defaultValue={value}
            style={{ width: "100%" }}
            options={STATUS}
            onChange={(e) =>
              onStatusChange(
                {
                  status: e,
                },
                record
              )
            }
          />
        );
      },
    },
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <Button icon={<DeleteFilled />} onClick={() => onDelete(record)} />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      virtual
      pagination={false}
    />
  );
};
