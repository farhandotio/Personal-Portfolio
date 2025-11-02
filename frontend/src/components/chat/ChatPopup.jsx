import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleChat } from "../../app/features/chat/chatSlice";
import Draggable from "react-draggable";

const DraggableChatButton = () => {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <button
        ref={nodeRef}
        onClick={() => dispatch(toggleChat())}
        className="fixed bg-primary text-white px-4 py-2 rounded-full shadow-lg z-50 cursor-pointer"
      >
        Chat
      </button>
    </Draggable>
  );
};

export default DraggableChatButton;
