import React from "react";
import "../styles/User.css";

const User = () => {
  // 사용자 정보
  const userInfo = {
    id: "user123",
    name: "홍길동",
    email: "hong@example.com",
  };

  // 목표 예산 및 통계 데이터
  const budgetInfo = {
    goalBudget: 1000000, // 목표 예산 (단위: 원)
    totalIncome: 750000, // 총 수입 (단위: 원)
    financeScore: 85, // 금융 점수 (최대 100점)
  };

  // 목표 달성률 계산
  const achievementRate = Math.min(
    (budgetInfo.totalIncome / budgetInfo.goalBudget) * 100,
    100
  ).toFixed(2);

  return (
    <div className="user-page">
      {/* 사용자 정보 */}
      <div className="user-info">
        <h2>사용자 정보</h2>
        <p>
          <strong>ID:</strong> {userInfo.id}
        </p>
        <p>
          <strong>이름:</strong> {userInfo.name}
        </p>
        <p>
          <strong>이메일:</strong> {userInfo.email}
        </p>
      </div>

      {/* 목표 예산 및 통계 */}
      <div className="budget-info">
        <h2>목표 및 금융 상태</h2>
        <p>
          <strong>목표 예산:</strong> {budgetInfo.goalBudget.toLocaleString()}원
        </p>
        <p>
          <strong>현재 목표 달성률:</strong> {achievementRate}%
        </p>
        <p>
          <strong>현재 금융 점수:</strong> {budgetInfo.financeScore}/100
        </p>
      </div>
    </div>
  );
};

export default User;
