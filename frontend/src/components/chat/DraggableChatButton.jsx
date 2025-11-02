import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleChat } from "../../app/features/chat/chatSlice";
import Draggable from "react-draggable";
import { BsChatDotsFill } from "react-icons/bs";

const DraggableChatButton = () => {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const { isOpen } = useSelector((state) => state.chat);

  return (
    <>
      {/* Draggable Button */}
      <Draggable nodeRef={nodeRef} bounds="body">
        <button
          ref={nodeRef}
          onClick={() => dispatch(toggleChat())}
          className="fixed right-5 bottom-5 sm:right-7 sm:bottom-7 md:right md:bottom-10 text-primary px-4 py-4 rounded-full shadow-lg cursor-pointer z-50 flex items-center justify-center gap-2"
        >
          <BsChatDotsFill className="text-5xl" />
        </button>
      </Draggable>

      {/* Messenger-style animation */}
      <div
        className={`fixed bottom-20 right-5 w-80 sm:w-96 h-96 bg-white rounded-t-lg shadow-xl border border-gray-200 z-40 transition-all duration-500 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
      >
        <div className="bg-primary text-white p-4 rounded-t-lg font-semibold">
          Messenger
        </div>
        <div className="p-4 h-full overflow-y-auto">
          {/* Messages will go here */}
          <p className="text-sm text-gray-500">Your messages will appear here...</p>
        </div>
      </div>
    </>
  );
};

export default DraggableChatButton;
