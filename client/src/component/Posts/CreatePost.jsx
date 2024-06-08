import React from "react";
import { Modal, Form, Input, Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const CreatePost = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Check if a file is selected
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/post/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post created:", response.data);

      form.resetFields();
      setOpen(false);

      if (response.status === 201) {
        message.success("Post created successfully!");
        window.location.reload();
      } else {
        message.error("Failed to create post. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post. Please try again later.");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold" }}>ADD POST</span>}
      visible={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="createTaskForm"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontSize: "16px" }}>Post Title :</span>}
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span style={{ fontSize: "16px" }}>Description :</span>}
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input.TextArea placeholder="Enter post description" />
        </Form.Item>

        <Form.Item
          name="image"
          label={<span style={{ fontSize: "16px" }}>Upload Image :</span>}
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePost;
