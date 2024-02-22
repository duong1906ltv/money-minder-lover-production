import { List } from "antd";

function InputOption(props) {
  const data = [
    {
      text: "1. Theo format",
      id: 1,
    },
    {
      text: "2. Từng câu",
      id: 2,
    },
  ];
  return (
    <List
      header={<div>Click vào option hoặc nhập số cũng được</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item onClick={() => props.actions.handleChooseInputType(item.id)}>
          {item.text}
        </List.Item>
      )}
    />
  );
}

export default InputOption;
