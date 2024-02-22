// import { useAllExpensesContext } from "../pages/AllExpenses";
import Wrapper from "../assets/wrappers/ExpenseContainer";
import { IoCaretBack, IoCaretForward, IoCaretDown } from "react-icons/io5";
import { DatePicker, Calendar, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const items = [
  {
    label: "Day View",
    value: "date",
  },
  {
    label: "Week View",
    value: "week",
  },
  // {
  //   type: "divider",
  // },
  {
    label: "Month View",
    value: "month",
  },
  {
    label: "Year View",
    value: "year",
  },
];

const ExpensesContainer = () => {
  //   const { data } = useAllExpensesContext();
  //   const expenses = data;
  const [dateType, setDateType] = useState("date");
  const handleChange = (value) => {
    setDateType(value);
  };

  return (
    <Wrapper>
      <header>
        <div className="date">
          <h1>{dayjs().format("MMMM DD, YYYY")}</h1>
          <p>{dayjs().format("dddd")}</p>
        </div>
        <div className="filters">
          <DatePicker
            // onChange={handleChange}
            defaultValue={dayjs()}
            picker={dateType}
            style={{ width: 150 }}
          />
          <div className="type-filter">
            <Select
              defaultValue="Day View"
              options={items}
              onChange={handleChange}
              style={{ width: 150 }}
              placeholder="Select to search"
            />
          </div>
        </div>
      </header>
      <main>
        <div style={{ height: "85vh", overflowY: "auto" }}>
          <Calendar headerRender={() => {}} />
        </div>
      </main>
    </Wrapper>
  );
};

export default ExpensesContainer;
