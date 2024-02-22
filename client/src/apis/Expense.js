import customFetch from "../utils/customFetch";

async function fetchExpenseCategories() {
  const res = await customFetch.get("/ggs/expensecat");
  return res.data;
}

async function updateExpense(newExpenseData) {
  const res = await customFetch.post("/ggs/expense", newExpenseData);
  return res.data;
}

export { fetchExpenseCategories, updateExpense };
