import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/home-page";
import { PageId } from "../pages/page-id";
import { UserPage } from "../pages/user-page";
import { EventsPage } from "../pages/events-page";
import { Layaut } from "../components/layaut";
import { AvatarUser } from "../pages/avatar-users";
import { Chat } from "../pages/chat";
import { Notificaciones } from "../pages/notificaciones";
import { ChatDetail } from "../components/ChatDetail";
import { EventsId } from "../pages/events-id";
import { Llamadas } from "../pages/llamadas";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layaut />}>
          <Route path="/" element={<MainPage />} />
          <Route path="product/:id" element={<PageId />} />
          <Route path="users" element={<UserPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="avatar" element={<AvatarUser />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="users/:id" element={<ChatDetail />} />
          <Route path="events/:id" element={<EventsId />} />
          <Route path="llamadas" element={<Llamadas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
