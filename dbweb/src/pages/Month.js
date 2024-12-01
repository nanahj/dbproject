import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axiosClient from "../api/axiosClient"; // Axios 클라이언트
import "../styles/Main.css";
import "../styles/Month.css";

const Month = () => {
  const [expenses, setExpenses] = useState([]); // 지출 데이터
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 선택된 월

  // 백엔드에서 지출 데이터 가져오기
  const fetchExpenses = async () => {
    try {
      const response = await axiosClient.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 월 변경 처리
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  // 달력 타일에 표시할 내용 생성
  const getTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayExpenses = expenses.filter((e) => e.date === formattedDate);

    if (dayExpenses.length > 0) {
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {dayExpenses.map((e) => (
            <li
              key={e.expenseId}
              style={{
                fontSize: "10px",
                color: e.type === "수입" ? "blue" : "red",
              }}
            >
              {e.description}: {e.amount.toLocaleString()}원
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  // 월별 수입, 지출, 잔액 계산
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
