import React, { useState } from "react";
import { useExpenses } from "../components/ExpensesContext";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/Category.css";
import "../styles/Main.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Category = () => {
  const { expenses } = useExpenses();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewType, setViewType] = useState("수입"); // "수입" 또는 "지출"

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      expense.type === viewType &&
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end)
    );
  });

  const categoryData = filteredExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: `${viewType} (원)`,
        data: Object.values(categoryData),
        backgroundColor: viewType === "수입" ? "blue" : "red",
        borderColor: viewType === "수입" ? "blue" : "red",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `카테고리별 ${viewType}` },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="full-container">
        <div className="category-container">
        <div className="controls">
            <div>
            <label>수입/지출:</label>
            <button
                className={`toggle-button ${viewType === "수입" ? "active" : ""}`}
                onClick={() => setViewType("수입")}
            >
                수입
            </button>
            <button
                className={`toggle-button ${viewType === "지출" ? "active" : ""}`}
                onClick={() => setViewType("지출")}
            >
                지출
            </button>
            </div>
            <div>
            <label>기간 선택:</label>
            <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
            />
            ~
            <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
            />
            </div>
        </div>
        <div className="chart-container">
            {Object.keys(categoryData).length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
            ) : (
            <p>선택된 기간 및 유형에 대한 데이터가 없습니다.</p>
            )}
        </div>
        </div>
    </div>
  );
};

export default Category;
