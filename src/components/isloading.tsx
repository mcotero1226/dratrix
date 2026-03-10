import React from "react";
import { Spin } from "antd";

type LoadingProps = {
  message?: string;
  size?: "small" | "default" | "large";
};

const Loading: React.FC<LoadingProps> = ({ message = "Cargando...", size = "large" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Spin size={size} tip={message} />
    </div>
  );
};

export { Loading }
