import React, { useState } from "react";
import Calendar from "react-calendar";
import { useExpenses } from "../components/ExpensesContext";
import "../styles/Main.css";
import "../styles/Month.css";

const Month = () => {
  const { expenses } = useExpenses();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 월 변경 처리
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  const getTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayExpenses = expenses.filter((e) => e.date === formattedDate);

    if (dayExpenses.length > 0) {
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {dayExpenses.map((e) => (
            <li
              key={e.id}
              style={{
                fontSize: "10px",
                color: e.type === "수입" ? "blue" : "red",
              }}
            >
              {e.description}: {e.amount}원
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const calculateMonthlyTotals = () => {
    const currentYearMonth = currentMonth.toISOString().slice(0, 7); // YYYY-MM 형식
    const filteredExpenses = expenses.filter(
      (e) => e.date.slice(0, 7) === currentYearMonth // 현재 년-월로 필터링
    );

    const income = filteredExpenses
      .filter((e) => e.type === "수입")
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const expense = filteredExpenses
      .filter((e) => e.type === "지출")
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const balance = income - expense;

    return { income, expense, balance };
  };

  const { income, expense, balance } = calculateMonthlyTotals();

  return (
    <div className="full-container">
      <div className="main-container">
        <div className="calendar-container">
          <Calendar
            tileContent={getTileContent}
            onActiveStartDateChange={handleActiveStartDateChange} // 월 변경 이벤트
            view="month"
          />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>종합 수입</th>
                <th>종합 지출</th>
                <th>잔액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: "blue" }}>{income.toLocaleString()}원</td>
                <td style={{ color: "red" }}>{expense.toLocaleString()}원</td>
                <td>{balance.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Month;
