import React from "react";
import { Spin } from "antd";

type LoadingProps = {
  message?: string;
  size?: "small" | "default" | "large";
};

const Loading: React.FC<LoadingProps> = ({ message = "Cargando..."}) => {
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
      <Spin  tip={message} />
    </div>
  );
};

export { Loading }
