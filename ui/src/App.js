import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AddOrUpdateTaskModal, TaskList } from "./components";
import { useTasksService, addTask, deleteTask, updateTask } from "./services";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { tasks, loading } = useTasksService();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Tasks",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 24,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Flex justify="space-between" align="center" flex={1}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Add Task <PlusOutlined />
            </Button>
            <AddOrUpdateTaskModal
              isOpen={isModalOpen}
              setModalOpen={setModalOpen}
              isEditMode={false}
              onSubmit={(data) => {
                return addTask(data).then(() => {
                  setModalOpen(false);
                  window.location.reload();
                });
              }}
            />
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <TaskList
            data={tasks}
            loading={loading}
            onDelete={(rowData) => {
              return deleteTask(rowData._id).then(() => {
                window.location.reload();
              });
            }}
            onStatusChange={(payload, rowData) => {
              return updateTask(rowData._id, payload).then(() => {
                window.location.reload();
              });
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
