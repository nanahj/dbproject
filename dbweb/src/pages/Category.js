import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient"; // Axios 클라이언트
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/Category.css";
import "../styles/Main.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Category = () => {
  const [expenses, setExpenses] = useState([]); // 백엔드에서 가져온 지출 데이터
  const [categories, setCategories] = useState([]); // 카테고리 데이터
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜
  const [viewType, setViewType] = useState("수입"); // "수입" 또는 "지출"

  // 백엔드에서 지출 데이터 가져오기
  const fetchExpenses = async () => {
    try {
      const response = await axiosClient.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // 백엔드에서 카테고리 데이터 가져오기
  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // 날짜 필터링
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  // 필터링된 지출 데이터
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

  // 카테고리별 데이터 합산
  const categoryData = filteredExpenses.reduce((acc, curr) => {
    const categoryName = categories.find((cat) => cat.categoryId === curr.categoryId)?.name || "기타";
    acc[categoryName] = (acc[categoryName] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  // 차트 데이터
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

  // 차트 옵션
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
