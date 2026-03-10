import { Card, Avatar, Tag, Space, Typography, Divider, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type TypeAvatarUser = {
  id: number;
  email: string;
  role: string;
  name: string;
  status: string;
};

const AvatarUser = () => {
  const raw = localStorage.getItem("users");
  const parsed = JSON.parse(raw || "[]");

  const users: TypeAvatarUser[] = Array.isArray(parsed)
    ? parsed
    : parsed
      ? [parsed]
      : [];

  if (users.length === 0) {
    return <Text type="secondary">No hay usuarios</Text>;
  }
  const eliminarUsuario = () => {
    localStorage.removeItem('users')
  }

  return (
    <Space
      direction="vertical"
      size={24}
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          style={{
            width: 360,
            borderRadius: 20,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          <Avatar
            size={96}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1677ff", marginBottom: 16 }}
          />

          <Title level={4} style={{ marginBottom: 4 }}>
            {user.name}
          </Title>

          <Space size={6}>
            <MailOutlined style={{ color: "#888" }} />
            <Text type="secondary">{user.email}</Text>
          </Space>

          <Divider />

          <Space size={12}>
            <Tag color={user.role === "admin" ? "volcano" : "blue"}>
              {user.role.toUpperCase()}
            </Tag>

            <Tag color={user.status === "active" ? "green" : "red"}>
              {user.status.toUpperCase()}
            </Tag>
          </Space>
        </Card>
      ))}
      <Button color="danger" variant="solid" onClick={eliminarUsuario}>
        Eliminar
      </Button>
    </Space>
  );
};

export { AvatarUser };
