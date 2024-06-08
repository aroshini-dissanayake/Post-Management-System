import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const EditPost = ({ open, setOpen, post, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null); // State to store new image preview

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        description: post.description
      });
    }
  }, [post, form]);

  const handleFileChange = ({ file }) => {
    console.log("Selected file:", file.originFileObj);
    setFile(file.originFileObj);
    // Generate a preview URL for the selected image
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onloadend = () => {
      setNewImagePreview(reader.result);
    };
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (file) {
        console.log("Appending file:", file);
        formData.append("image", file);
      }
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/api/v1/post/updatepost/${post._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.status === 200) {
        message.success("Post updated successfully");
        setNewImagePreview(null); // Reset the new image preview
      } else {
        message.error("Failed to update post");
      }
      setLoading(false);
      form.resetFields();
      setFile(null);
      setOpen(false);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setLoading(false);
      message.error("Failed to update post");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFile(null);
    setNewImagePreview(null); // Reset the new image preview
    setOpen(false);
  };

  const beforeUpload = (file) => {
    setFile(file);
    return false; // Prevent default upload behavior
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold" }}>EDIT POST</span>}
      visible={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="editPostForm"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontSize: "16px" }}>Post Title :</span>}
          rules={[
            { required: true, message: "Title is required!" },
            { min: 3, message: "Title must be at least 3 characters long" },
            { max: 100, message: "Title cannot exceed 100 characters" }
          ]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span style={{ fontSize: "16px" }}>Description :</span>}
        >
          <Input.TextArea placeholder="Enter post description" />
        </Form.Item>

        <Form.Item
          name="image"
          label={<span style={{ fontSize: "16px" }}>Upload New Image :</span>}
        >
          <Upload beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPost;
