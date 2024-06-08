import { Menu } from "antd";
import { useState, useEffect } from "react";
import { HomeOutlined, RollbackOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaUser, FaUsers, FaArrowRight } from "react-icons/fa";

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleMenuSelect = (e) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    // {
    //   key: "/postsdetails",
    //   icon: <FaArrowRight />,
    //   label: "Publishing",
    // },
    // {
    //   key: "/messages",
    //   icon: <FaEnvelope />,
    //   label: "messages",
    // },
    // {
    //   key: "/team",
    //   icon: <FaUsers />,
    //   label: "Teams",
    // },
    // {
    //   key: "/accounts",
    //   icon: <FaUser />,
    //   label: "Account",
    // },
    // {
    //   key: "/logout",
    //   icon: <RollbackOutlined />,
    //   label: "Logout",
    // },
  ];

  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onClick={handleMenuSelect}
      items={menuItems}
    />
  );
};

export default MenuList;
