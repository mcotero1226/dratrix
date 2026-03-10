import { useParams } from "react-router-dom";
import { Layout, Typography, Avatar, Spin, Empty, Input, Button } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import { useUserById } from "../hooks/usechatuser";
import { useState, useEffect } from "react";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUserById(id);

  const [variable, setVariable] = useState("");
  const [mensajes, setMensajes] = useState<string[]>(() => {
    const saved = localStorage.getItem("mensajes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
  }, [mensajes]);

  const enviar = () => {
    if (!variable.trim()) return;
    setMensajes((prev) => [...prev, variable]);
    setVariable("");
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        <Empty description={error.message} />
      </div>
    );

  return (
    <Layout className="h-screen">

      {/* HEADER */}
      <Header className="bg-slate-900 flex items-center gap-4 px-6 shadow-md">
        <Avatar
          size={48}
          icon={<UserOutlined />}
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.id}`}
          className="shadow"
        />
        <div>
          <Title level={4} className="!text-white !m-0 mt-2">
            {user?.name}
          </Title>
          <span className="text-green-400 text-sm">● Online</span>
        </div>
      </Header>

      {/* CONTENT */}
      <Content className="bg-gray-100 p-6 overflow-y-auto flex-1">
        <div className="max-w-3xl mx-auto space-y-3">
          {mensajes.map((msg, index) => (
            <div key={index} className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md max-w-xs break-words">
                {msg}
              </div>
            </div>
          ))}
        </div>
      </Content>

      {/* FOOTER */}
      <Footer className="bg-white border-t px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Input
            size="large"
            placeholder="Escribe un mensaje..."
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            onPressEnter={enviar}
            className="rounded-xl"
          />
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            onClick={enviar}
            className="rounded-xl"
          />
        </div>
      </Footer>

    </Layout>
  );
};

export { ChatDetail };