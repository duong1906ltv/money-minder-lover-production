import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./Chatbot/config";
import MessageParser from "./Chatbot/MessageParser";
import ActionProvider from "./Chatbot/ActionProvider";

function ChatBotContainer() {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
}

export default ChatBotContainer;
