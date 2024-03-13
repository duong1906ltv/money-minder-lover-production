/* eslint-disable react/prop-types */
import React from "react";

const MessageParser = ({ children, actions }) => {
  const { checker, updateData } = children.props.state;
  const parse = (message) => {
    if (checker === null) {
      if (message.includes("1")) {
        actions.handleIncomeChoice();
      } else if (message.includes("2")) {
        actions.handleExpenseChoice();
      }
    }
    if (checker === "end") {
      if (
        message.toLowerCase().includes("hello bot cute") ||
        message.toLowerCase().includes("hello") ||
        message.toLowerCase().includes("start")
      ) {
        actions.handleInitial();
      }
    }

    if (checker === "inputOption") {
      actions.handleIncomeInputOption();
    }
    if (checker === "formatInput") {
      if (children.props.state.updateData.type === 1) {
        actions.handleUpdateIncomes(message);
      }
      if (children.props.state.updateData.type === 2) {
        actions.handleUpdateExpenses(message);
      }
    }
    if (checker === "afterInputMoney") {
      actions.handleIncomeBySentencesNote(message);
    }
    if (checker === "afterInputNote") {
      if (children.props.state.updateData.type === 1) {
        actions.handleUpdateIncomes(message);
      }
      if (children.props.state.updateData.type === 2) {
        actions.handleUpdateExpenses(message);
      }
    }
    if (checker === "batchInput") {
      if (message.toLowerCase().includes("end")) {
        actions.handleBatchUpdateAPI();
      } else {
        if (updateData.input === "") {
          updateData.input = message;
        } else {
          updateData.input = updateData.input + "; " + message;
        }
      }
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
};

export default MessageParser;
