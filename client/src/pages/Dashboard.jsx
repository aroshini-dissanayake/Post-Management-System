import React, { useState } from "react";
import Logo from "../component/Sidebar/Logo";
import MenuList from "../component/Sidebar/MenuList";
import { Layout, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreatePost from "../component/Posts/CreatePost";
import PostsDetails from "../component/Posts/PostsDetails";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div className="header-container">
            <h1 className="header-title">Posts </h1>
            <div className="header-buttons">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={toggleModal}
              >
                Create Posts
              </Button>
            </div>
          </div>
          {open && <CreatePost open={open} setOpen={setOpen} />}
          <PostsDetails />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
