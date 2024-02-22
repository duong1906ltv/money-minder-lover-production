import { List } from "antd";

function Option(props) {
  const data = [
    {
      text: "1. Cập nhật thu nhập",
      handler: props.actions.handleIncomeChoice,
      id: 1,
    },
    {
      text: "2. Cập nhật chi tiêu",
      handler: props.actions.handleExpenseChoice,
      id: 2,
    },
  ];
  return (
    <List
      header={<div>Click vào option hoặc nhập số cũng được </div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item onClick={() => item.handler()}>{item.text}</List.Item>
      )}
    />
  );
}

export default Option;
