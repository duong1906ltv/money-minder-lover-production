import { useState } from "react";
import { Button, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchExpenseCategories } from "../../../apis/Expense";

function ExpenseCategoryOption(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const onValueChange = (value) => {
    setSelectedValue(value);
    props.state.updateData.category = value;
  };
  const handleSubmit = () => {
    props.actions.handleSelectDate();
  };
  // Queries
  const query = useQuery({
    queryKey: ["expensecat"],
    queryFn: fetchExpenseCategories,
  });

  return (
    <Space>
      <Select
        style={{
          width: 120,
        }}
        allowClear
        options={query.data}
        onChange={onValueChange}
      />
      <Button onClick={handleSubmit} disabled={!selectedValue}>
        Submit
      </Button>
    </Space>
  );
}

export default ExpenseCategoryOption;
