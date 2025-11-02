import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ChatPopup from "./components/chat/ChatPopup";
import DraggableChatButton from "./components/chat/DraggableChatButton";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <div className="max-w-[1900px] mx-auto">
          <MainRoutes />
        </div>
        <Footer />

        {/* Draggable Chat Button */}
        <DraggableChatButton />

        {/* Global Chat Popup */}
        <ChatPopup />
      </div>
    </BrowserRouter>
  );
};

export default App;
