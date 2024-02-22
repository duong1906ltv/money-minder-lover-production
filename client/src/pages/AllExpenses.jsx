/* eslint-disable react-refresh/only-export-components */
import { ExpensesContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  return {
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
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

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllExpensesContext = createContext();
const AllExpenses = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  return (
    <AllExpensesContext.Provider value={{ data, searchValues }}>
      <ExpensesContainer />
    </AllExpensesContext.Provider>
  );
};

export const useAllExpensesContext = () => useContext(AllExpensesContext);

export default AllExpenses;
