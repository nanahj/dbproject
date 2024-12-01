import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "../styles/Main.css";

const Main = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    userId: 1, // 기본 사용자 ID
    date: "",
    amount: "",
    description: "",
    categoryId: "",
    type: "수입",
  });

  // 모든 지출 내역 가져오기
  const fetchExpenses = async () => {
    try {
      const response = await axiosClient.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // 모든 카테고리 가져오기
  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  // 새 지출 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/expenses", expense);
      fetchExpenses(); // 데이터 새로고침
      setExpense({
        userId: 1, // 기본 사용자 ID
        date: "",
        amount: "",
        description: "",
        categoryId: "",
        type: "수입",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // 지출 삭제
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/expenses/${id}`);
      fetchExpenses(); // 데이터 새로고침
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  return (
    <div className="full-container">
      <div className="add-container">
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
            name="categoryId"
            value={expense.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">카테고리 선택</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          <select name="type" value={expense.type} onChange={handleChange}>
            <option value="수입">수입</option>
            <option value="지출">지출</option>
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
              <tr key={item.expenseId}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.description}</td>
                <td>{item.category?.name || "없음"}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => handleDelete(item.expenseId)}>삭제</button>
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
