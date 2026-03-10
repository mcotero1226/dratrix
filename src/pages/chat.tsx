import { Layout, List, Avatar, Spin, Typography, Empty, Input } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useDataChat } from "../hooks/usedatausersApi";
import type { UserType } from "../pages/user-page";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;
const { Title } = Typography;

const Chat = () => {
  const { isLoading, contactos, error } = useDataChat();
  const [busqueda, setBusqueda] = useState("");

  const resultados = contactos?.filter((item) =>
    item.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (error) return <Empty description="Error al cargar contactos" />;

  return (
    <Layout style={{ height: "100vh", background: "#f0f2f5" }}>
      <Sider
        width={300}
        style={{
          background: "#fff",
          padding: "16px",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <Title level={4}>Contactos</Title>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Buscar usuario..."
          allowClear
          size="large"
          style={{ marginBottom: 16 }}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <List
          itemLayout="horizontal"
          dataSource={resultados}
          locale={{ emptyText: "No se encontraron usuarios" }}
          renderItem={(item: UserType) => (
            <List.Item style={{ cursor: "pointer" }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`}
                  />
                }
                title={item.name}
                description="Último mensaje..."
              />

              <Link to={`/users/${item.id}`}>
                <button
                  style={{
                    background: "#1677ff",
                    border: "none",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Ver
                </button>
              </Link>
            </List.Item>
          )}
        />
      </Sider>
    </Layout>
  );
};

export { Chat };