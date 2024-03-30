import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateIncome } from "../../apis/Income";
import { updateExpense, updateExpenseSheetBatch } from "../../apis/Expense";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const addIncomeMutation = useMutation({
    mutationFn: updateIncome,
  });

  const addExpenseMutation = useMutation({
    mutationFn: updateExpense,
  });

  const addExpenseBatchMutation = useMutation({
    mutationFn: updateExpenseSheetBatch,
  });

  const handleInitial = () => {
    const msg1 = createChatBotMessage(`Hello NN béo`);
    updateChatbotState(msg1, null);
    const msg2 = createChatBotMessage("Hôm nay NN béo muốn làm gì", {
      withAvatar: true,
      widget: "Option",
    });
    updateChatbotState(msg2);
  };

  const handleIncomeChoice = () => {
    children.props.children.props.state.updateData.type = 1;
    const message1 = createChatBotMessage("NN đã chọn cập nhật thu nhập. ");

    updateChatbotState(message1);

    const message2 = createChatBotMessage(
      "NN muốn nhập thu nhập bằng cách nào?",
      { widget: "InputOption", withAvatar: true, delay: 500 }
    );
    updateChatbotState(message2, "inputOption");
  };

  const handleExpenseChoice = () => {
    children.props.children.props.state.updateData.type = 2;
    const message = createChatBotMessage(
      "NN đã chọn cập nhật chi tiêu. NN muốn nhập chi tiêu theo format hay từng câu 1?",
      { widget: "InputOption" }
    );

    updateChatbotState(message, "inputOption");
  };

  const handleChooseInputType = (inputType) => {
    children.props.children.props.state.inputType = inputType;
    if (children.props.children.props.state.updateData.type === 1) {
      const message = createChatBotMessage("NN béo chọn nguồn thu nhập đi", {
        widget: "IncomeCategoryOption",
      });
      updateChatbotState(message);
    } else {
      const message = createChatBotMessage("NN béo chọn nguồn chi tiêu đi", {
        widget: "ExpenseCategoryOption",
      });
      updateChatbotState(message);
    }
  };

  const handleIncomeByFormat = () => {
    const message = createChatBotMessage(
      <div>
        NN Béo nhập format như phía dưới nha
        <br />
        Số tiền - Note
      </div>
    );
    updateChatbotState(message, "formatInput");
  };

  const handleSelectDate = () => {
    const message = createChatBotMessage(
      <div>
        NN Béo nhập thời gian đi:
        <br />
        (Không nhập thời gian cũng được)
      </div>,
      { widget: "selectDate" }
    );
    updateChatbotState(message, "afterSelectDate");
  };

  const handleIncomeBySentencesMoney = (date) => {
    children.props.children.props.state.updateData.date = date;
    const message = createChatBotMessage(<div>NN Béo nhập số tiền đi:</div>);
    updateChatbotState(message, "afterInputMoney");
  };

  const handleIncomeBySentencesNote = (money) => {
    const regex = /^((\d+)(tr)?(\d+)?(k)?)$/;
    const match = money.match(regex);

    if (match) {
      let amount = 0;

      if (match[2]) {
        amount +=
          parseInt(match[2]) * (match[3] ? 1000000 : match[5] ? 1000 : 1); // Kiểm tra xem có đơn vị "tr" không
      }

      if (match[4]) {
        amount += parseInt(match[4]) * (match[5] ? 1000 : 1); // Kiểm tra xem có đơn vị "k" không
      }

      children.props.children.props.state.updateData.money = amount;
      const message = createChatBotMessage(
        <div>NN Béo có ghi chú gì không:</div>
      );
      updateChatbotState(message, "afterInputNote");
    } else {
      console.error("Invalid money format:", money);
    }
  };

  const handleUpdateIncomes = async (message) => {
    const messageToDetect = message;
    if (children.props.children.props.state.inputType === 1) {
      const regex = /^((\d+)(tr)?(\d+)?(k)?)\s*-\s*(.*)$/;
      const match = messageToDetect.match(regex);

      if (match) {
        let amount = 0;

        if (match[2]) {
          amount +=
            parseInt(match[2]) * (match[3] ? 1000000 : match[5] ? 1000 : 1); // Nếu có phần tr, nhân với 1 triệu
        }

        if (match[4]) {
          amount += parseInt(match[4]) * (match[5] ? 1000 : 1); // Nếu có phần k, nhân với 1 nghìn
        }

        const note = match[6].trim();

        // Gán vào state hoặc làm điều gì đó khác với amount và note
        children.props.children.props.state.updateData.money = amount;
        children.props.children.props.state.updateData.note = note;

        try {
          await addIncomeMutation.mutateAsync(
            children.props.children.props.state.updateData
          );
        } catch (error) {
          console.error("Error adding income:", error);
        }

        const message = createChatBotMessage(
          "Cập nhật thu nhập ok rồi đó NN béo, check sheet xem"
        );

        updateChatbotState(message);

        const message2 = createChatBotMessage("Tui mệt rùi. Off đây. Bye Bye", {
          withAvatar: true,
          delay: 500,
        });
        updateChatbotState(message2, "end");
      }
    }
    if (children.props.children.props.state.inputType === 2) {
      children.props.children.props.state.updateData.note = messageToDetect;

      try {
        await addIncomeMutation.mutateAsync(
          children.props.children.props.state.updateData
        );
      } catch (error) {
        console.error("Error adding income:", error);
      }

      const message = createChatBotMessage(
        "Cập nhật thu nhập ok rồi đó NN béo, check sheet xem"
      );

      updateChatbotState(message);

      const message2 = createChatBotMessage("Tui mệt rùi. Off đây. Bye Bye", {
        withAvatar: true,
        delay: 500,
      });
      updateChatbotState(message2, "end");
    }
  };

  const handleUpdateExpenses = async (message) => {
    const messageToDetect = message;
    if (children.props.children.props.state.inputType === 1) {
      const regex = /^((\d+)(tr)?(\d+)?(k)?)\s*-\s*(.*)$/;

      const match = messageToDetect.match(regex);

      if (match) {
        let amount = 0;

        if (match[2]) {
          amount +=
            parseInt(match[2]) * (match[3] ? 1000000 : match[5] ? 1000 : 1); // Nếu có phần tr, nhân với 1 triệu
        }

        if (match[4]) {
          amount += parseInt(match[4]) * (match[5] ? 1000 : 1); // Nếu có phần k, nhân với 1 nghìn
        }

        const note = match[6].trim();

        // Gán vào state hoặc làm điều gì đó khác với amount và note
        children.props.children.props.state.updateData.money = amount;
        children.props.children.props.state.updateData.note = note;

        try {
          await addExpenseMutation.mutateAsync(
            children.props.children.props.state.updateData
          );
        } catch (error) {
          console.error("Error adding income:", error);
        }

        const message = createChatBotMessage(
          "Cập nhật chi tiêu ok rồi đó NN béo, check sheet xem"
        );

        updateChatbotState(message);
        endChatbotSession();
      }
    }
    if (children.props.children.props.state.inputType === 2) {
      children.props.children.props.state.updateData.note = messageToDetect;

      try {
        await addExpenseMutation.mutateAsync(
          children.props.children.props.state.updateData
        );
      } catch (error) {
        console.error("Error adding income:", error);
      }

      const message = createChatBotMessage(
        "Cập nhật chi tiêu ok rồi đó NN béo, check sheet xem"
      );

      updateChatbotState(message);
      endChatbotSession();
    }
  };

  const endChatbotSession = () => {
    children.props.children.props.state.updateData =
      children.props.children.props.state.defaultState;
    children.props.children.props.state.inputType = 0;

    const farewellMessage = createChatBotMessage(
      "Tui mệt rùi. Off đây. Bye Bye",
      {
        withAvatar: true,
        delay: 500,
      }
    );

    updateChatbotState(farewellMessage, "end");
  };

  const updateChatbotState = (message, checker) => {
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      checker,
    }));
  };

  const handleUpdateBatchChoice = () => {
    const message = createChatBotMessage(
      <div>
        NN Béo nhập format như phía dưới nha ( Nhấn "End" để kết thúc nhập)
        <br />
        Ngày (DD/MM/YYYY) - Số tiền - Note
      </div>
    );
    updateChatbotState(message, "batchInput");
  };

  const handleBatchUpdateAPI = async () => {
    try {
      await addExpenseBatchMutation.mutateAsync(
        children.props.children.props.state.updateData
      );
      children.props.children.props.state.updateData.input = "";
    } catch (error) {
      console.error("Error adding income:", error);
    }

    const message = createChatBotMessage(
      "Cập nhật chi tiêu ok rồi đó NN béo, check sheet xem"
    );

    updateChatbotState(message);
    endChatbotSession();
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleIncomeChoice,
            handleExpenseChoice,
            handleIncomeByFormat,
            handleChooseInputType,
            handleUpdateIncomes,
            handleSelectDate,
            handleIncomeBySentencesMoney,
            handleIncomeBySentencesNote,
            handleInitial,
            handleUpdateExpenses,
            handleUpdateBatchChoice,
            handleBatchUpdateAPI,
          },
        });
      })}
    </>
  );
};

export default ActionProvider;
