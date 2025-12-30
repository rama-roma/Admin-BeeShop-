import { Layout as AntLayout, Menu, Button, Tooltip } from "antd";
import {
  AppstoreOutlined,
  TagsOutlined,
  BgColorsOutlined,
  FolderOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Sider, Content, Header } = AntLayout;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>

      <Sider
        collapsible
        width={220}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: "#111220",
          position: "relative",
          boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-white text-center text-xl font-bold py-4">
          {!collapsed && "Admin Panel"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          style={{
            background: "#111220",
            color: "#fff",
            borderRight: "none",
          }}
          items={[
            { key: "/productPage", icon: <AppstoreOutlined />, label: "Products" },
            { key: "/brandPage", icon: <TagsOutlined />, label: "Brands" },
            { key: "/colorPage", icon: <BgColorsOutlined />, label: "Colors" },
            { key: "/categoryPage", icon: <FolderOutlined />, label: "Categories" },
          ]}
        />

        <div
          style={{
            position: "relative",
            top:"300px",
            bottom: 20,
            width: "100%",
            padding: "0 16px",
          }}
        >
          {collapsed ? (
            <Tooltip title="Выйти" placement="right">
              <Button
                danger
                shape="circle"
                icon={<ExportOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>
          ) : (
            <Button
              danger
              block
              icon={<ExportOutlined />}
              style={{
                background: "#ff4d4f",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              onClick={handleLogout}
            >
              LogOut
            </Button>
          )}
        </div>
      </Sider>

      <AntLayout style={{ background: "#1f1f2e" }}>
        <Header
          style={{
            background: "linear-gradient(90deg, #1f1f2e, #2c2c3e)",
            color: "#fff",
            padding: "0 20px",
            fontWeight: 600,
            fontSize: "18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
          }}
        >
          Dashboard
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: "20px",
            background: "linear-gradient(145deg, #1f1f2e, #2c2c3e)",
            borderRadius: "12px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            minHeight: "calc(100vh - 64px - 32px)",
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
