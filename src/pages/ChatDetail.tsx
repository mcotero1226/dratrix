import { useParams } from "react-router-dom";
import { Layout, Typography, Avatar, Spin, Empty, Input, Button } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import { useUserById } from "../hooks/usechatuser";
import { useState, useEffect } from "react";
import { MyButton } from "../components/button-borrar";
import { useChatDelet } from "../hooks/usechatdelet";
import { DeleteOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { usePostLlamadas } from "../hooks/usepostllamadas";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUserById(id);
  const { mutate: deleteChat } = useChatDelet();
  const { mutate: postLlamadas } = usePostLlamadas()

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
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <Empty description={error.message} />
      </div>
    );


  return (
    <Layout className="h-screen flex flex-col bg-slate-100">

      <Header className="bg-slate-900 flex items-center justify-between px-6 shadow-lg border-b border-slate-800">

        <div className="flex items-center gap-4">

          <Avatar
            size={48}
            icon={<UserOutlined />}
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.id}`}
            className="shadow-md"
          />

          <div className="flex flex-col leading-tight">
            <Title level={4} >
              {user?.name}
            </Title>

            <span className="text-green-400 text-xs font-medium">
              ● Online
            </span>

          </div>

        </div>
        <div className="flex justify-end -mt-50 gap-10">
          <MyButton
            icon={<DeleteOutlined />}
            text={"danger"}
            significado={"Borrar users"}
            onClick={() => {
              if (!user?.id) return
              deleteChat(user?.id)
            }}
          />
          <MyButton
            icon={<PhoneOutlined />}
            text={"primary"}
            significado={"Llamar"}
            onClick={() => {
              if (!user) return;
              postLlamadas(user);
            }}
          />
        </div>

      </Header>

      <Content className="flex-1 overflow-y-auto p-6">

        <div className="max-w-3xl mx-auto flex flex-col gap-3">

          {mensajes.length === 0 && (
            <div className="text-center text-slate-400 mt-20">
              No hay mensajes todavía
            </div>
          )}

          {mensajes.map((msg, index) => (

            <div key={index} className="flex justify-end">

              <div
                className="
                bg-blue-500
                text-white
                px-4
                py-2
                rounded-2xl
                rounded-br-md
                shadow
                max-w-xs
                text-sm
                hover:scale-[1.02]
                transition
                duration-200
                "
              >
                {msg}
              </div>

            </div>

          ))}

        </div>

      </Content>

      <Footer className="bg-white border-t border-slate-200 px-6 py-4">

        <div className="max-w-3xl mx-auto flex items-center gap-3">

          <Input
            size="large"
            placeholder="Escribe un mensaje..."
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            onPressEnter={enviar}
            className="
            rounded-xl
            border-slate-300
            focus:border-blue-500
            "
          />

          <Button

            type="primary"
            size="large"
            icon={<SendOutlined />}
            onClick={enviar}
            className="
            rounded-xl
            flex items-center
            justify-center
            shadow-md
            hover:shadow-lg
            transition
            "
          />

        </div>

      </Footer>

    </Layout>
  );
};

export { ChatDetail };