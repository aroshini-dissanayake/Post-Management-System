import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout, Button, Row, Col, Popconfirm, message } from "antd";
import axios from "axios";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditPost from "./EditPost";

const { Sider, Content } = Layout;

const SpecificPostDetails = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const params = useParams();
  const postId = params.postId; // Access 'id' from URL params

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/post/getpost/${postId}`
      );
      const postData = response.data.post;
      setTitle(postData.title);
      setDescription(postData.description);
      setImage(postData.image); // Set image URL
      setEditPost(postData); // Update editPost with fetched data
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/post/deletepost/${postId}`
      );
      if (response.status === 200) {
        message.success("Post deleted successfully");
        window.location.href = "/";
      } else {
        message.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post");
    }
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <MenuList />
      </Sider>
      <Content
        className="content"
        style={{ padding: "20px", marginTop: "50px" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              md={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`http://localhost:8080/${image}`}
                alt="post"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col xs={24} md={16}>
              <div
                style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
              >
                <Button
                  type="link"
                  icon={
                    <EditOutlined
                      style={{
                        color: "green",
                        fontSize: "18px",
                        marginRight: 20,
                      }}
                    />
                  }
                  onClick={handleEditButtonClick}
                />
                <Popconfirm
                  title="Delete the post"
                  description="Are you sure to delete this post?"
                  onConfirm={handleDeletePost}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="link"
                    icon={
                      <DeleteOutlined
                        style={{ color: "red", fontSize: "18px" }}
                      />
                    }
                  />
                </Popconfirm>
              </div>
              <div style={{ padding: "0 20px" }}>
                <h1
                  style={{
                    marginTop: "30px",
                    fontSize: "30px",
                    textAlign: "left",
                  }}
                >
                  {title}
                </h1>
                <p
                  style={{
                    marginTop: "30px",
                    fontSize: "16px",
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {description}
                </p>
                <div style={{ textAlign: "left", marginTop: "20px" }}>
                  <Button type="primary" href="/">
                    Go back
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      {editPost && (
        <EditPost
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          post={editPost}
          onUpdate={fetchPost} // Fetch post details after update
        />
      )}
    </Layout>
  );
};

export default SpecificPostDetails;
