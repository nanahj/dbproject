import React, { createContext, useContext, useState } from "react";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpensesContext);
