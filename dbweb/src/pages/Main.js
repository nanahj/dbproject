import React, { useState } from "react";
import { useExpenses } from "../components/ExpensesContext";
import "../styles/Main.css";

const Main = () => {
  const { expenses, addExpense, removeExpense } = useExpenses();
  const [expense, setExpense] = useState({
    date: "",
    amount: "",
    description: "",
    category: "",
    type: "수입",
  });
  const [expenseType, setExpenseType] = useState("수입");

  const categories = {
    수입: ["급여", "보너스", "기타"],
    지출: ["식비", "교통비", "기타"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setExpenseType(type);
    setExpense((prev) => ({ ...prev, type, category: "" })); // 카테고리 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.date && expense.amount && expense.description) {
      addExpense({ ...expense, id: Date.now() });
      setExpense({ date: "", amount: "", description: "", category: "", type: expenseType });
    }
  };

  return (
    <div className="full-container">
      <div className="add-container">
        <button className="button-io" onClick={() => handleTypeChange("수입")}>
          수입
        </button>
        <button className="button-io" onClick={() => handleTypeChange("지출")}>
          지출
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="금액"
            value={expense.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="내역"
            value={expense.description}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          >
            <option value="">카테고리</option>
            {categories[expenseType].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit">추가</button>
        </form>
      </div>

      <div className="main-container">
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>금액</th>
              <th>내역</th>
              <th>카테고리</th>
              <th>유형</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => removeExpense(item.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
