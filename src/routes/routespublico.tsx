import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login";

const AppRouterPublico= () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouterPublico };

