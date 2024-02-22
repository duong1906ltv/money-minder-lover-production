import { createChatBotMessage } from "react-chatbot-kit";
import Option from "./Options/Option";
import InputOption from "./Options/InputOption";
import IncomeCategoryOption from "./Options/IncomeCategoryOption";
import ChooseDate from "./Options/ChooseDate";
import ExpenseCategoryOption from "./Options/ExpenseCategoryOption";

const botName = "Money Minder Lover Bot";

const config = {
  initialMessages: [
    createChatBotMessage(`Hello NN béo`),
    createChatBotMessage("Hôm nay NN béo muốn làm gì", {
      withAvatar: true,
      widget: "Option",
      delay: 500,
    }),
  ],
  state: {
    checker: null,
    defaultState: {
      category: "",
      date: "",
      type: "",
      money: 0,
      note: "",
    },
    updateData: {
      category: "",
      date: "",
      type: "",
      money: 0,
      note: "",
    },
    inputType: 0,
  },
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  widgets: [
    {
      widgetName: "Option",
      widgetFunc: (props) => <Option {...props} />,
    },
    {
      widgetName: "InputOption",
      widgetFunc: (props) => <InputOption {...props} />,
    },
    {
      widgetName: "IncomeCategoryOption",
      widgetFunc: (props) => <IncomeCategoryOption {...props} />,
    },
    {
      widgetName: "ExpenseCategoryOption",
      widgetFunc: (props) => <ExpenseCategoryOption {...props} />,
    },
    {
      widgetName: "selectDate",
      widgetFunc: (props) => <ChooseDate {...props} />,
    },
  ],
};

export default config;
