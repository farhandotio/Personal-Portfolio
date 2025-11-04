// components/chat/ChatButton.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../app/features/chat/chatSlice";
import { IoIosChatbubbles } from "react-icons/io";

const ChatButton = () => {
  const { user } = useSelector((state) => state.auth);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openChat());
  };

  // ✅ Prevent error if user is null
  if (!user || user.role === "admin") {
    return null;
  }

  return (
    <div
      ref={ref}
      className="fixed flex justify-end items-end rounded-full bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-10 md:right-10 z-1000"
    >
      <motion.button
        drag
        dragConstraints={ref}
        whileDrag={{ scale: 1.08 }}
        onClick={handleClick}
        className="relative cursor-pointer rounded-full active:scale-95"
        aria-label="Open chat"
      >
        <IoIosChatbubbles className="size-18 text-primary" />
      </motion.button>
    </div>
  );
};

export default ChatButton;
