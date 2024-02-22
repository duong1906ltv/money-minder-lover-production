import customFetch from "../utils/customFetch";

async function fetchIncomeCategories() {
  const res = await customFetch.get("/ggs/incomecat");
  return res.data;
}

async function updateIncome(newIncomeData) {
  const res = await customFetch.post("/ggs/income", newIncomeData);
  return res.data;
}

export { fetchIncomeCategories, updateIncome };
