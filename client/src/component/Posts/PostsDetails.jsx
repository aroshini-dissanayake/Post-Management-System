import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const PostsDetails = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/v1/post/getposts"
        );
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px", marginTop: "40px" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          {posts.map((post) => (
            <Col span={8} key={post._id}>
              <Link to={`/getpost/${post._id}`}>
                <Card
                  hoverable
                  style={{
                    marginBottom: "15px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {post.image && (
                    <div style={{ height: "200px" }}>
                      {" "}
                      <img
                        alt="post"
                        src={`http://localhost:8080/${post.image}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </div>
                  )}

                  <h3
                    style={{
                      textAlign: "justify",
                      marginBottom: "10px",
                      marginTop: "10px",
                      wordWrap: "break-word"
                    }}
                  >
                    {post.title}
                  </h3>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default PostsDetails;
