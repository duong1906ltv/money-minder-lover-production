/* eslint-disable react-refresh/only-export-components */
import { ExpensesContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const ExpensesQuery = () => {
  return {
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await customFetch.get("/expenses");
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(ExpensesQuery(params));
    return { searchValues: { ...params } };
  };

const ExpensesContext = createContext();
const Expenses = () => {
  const { data } = useQuery(ExpensesQuery());
  return (
    <ExpensesContext.Provider value={{ data }}>
      <ExpensesContainer />
    </ExpensesContext.Provider>
  );
};

export const useAllExpensesContext = () => useContext(ExpensesContext);

export default Expenses;
