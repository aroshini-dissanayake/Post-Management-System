import { Menu } from "antd";
import { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

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
      label: "Dashboard"
    }
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
