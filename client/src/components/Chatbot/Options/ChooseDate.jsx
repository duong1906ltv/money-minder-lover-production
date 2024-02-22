import { Button, DatePicker, Space } from "antd";

function ChooseDate(props) {
  const onChange = (date, dateString) => {
    props.state.updateData.date = dateString;
  };
  const handleSubmit = () => {
    if (props.state.inputType === 1) {
      props.actions.handleIncomeByFormat();
    } else {
      props.actions.handleIncomeBySentencesMoney();
    }
  };

  return (
    <Space>
      <DatePicker
        onChange={onChange}
        format={"DD/MM/YYYY"}
        placeholder="DD/MM/YYYY"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Space>
  );
}

export default ChooseDate;
