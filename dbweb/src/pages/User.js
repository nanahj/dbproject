import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "../styles/User.css";
import { useUser } from "../components/UserContext";

const User = () => {
  const { userInfo, setUserInfo } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 사용자 정보를 가져옴
        const response = await axiosClient.get("/users/1"); // 사용자 ID
        if (setUserInfo) {
          setUserInfo(response.data); // 상태 업데이트
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUser();
  }, [setUserInfo]); // 의존성 배열에 setUserInfo를 포함
  

  if (!userInfo) {
    return <p>로딩 중...</p>;
  }
  

  // 목표 예산 및 통계 데이터 (예제)
  const budgetInfo = {
    goalBudget: userInfo.target_budget || 0,
    totalIncome: userInfo.totalIncome || 0, // totalIncome이 백엔드에 있다고 가정
    financeScore: userInfo.financialScore || 0,
  };

   // 목표 달성률 계산
   const achievementRate = Math.min(
    (userInfo.totalIncome / userInfo.targetBudget) * 100,
    100
  ).toFixed(2);

  return (
    <div className="user-page">
      {/* 사용자 정보 */}
      <div className="user-info">
        <h2>사용자 정보</h2>
        <p>
          <strong>ID:</strong> {userInfo.userId}
        </p>
        <p>
          <strong>이름:</strong> {userInfo.username}
        </p>
        <p>
          <strong>이메일:</strong> {userInfo.email}
        </p>
      </div>

      {/* 목표 예산 및 통계 */}
      <div className="budget-info">
        <h2>목표 및 금융 상태</h2>
        <p>
          <strong>목표 예산:</strong> {userInfo.target_budget}원
        </p>
        <p>
          <strong>현재 목표 달성률:</strong> {achievementRate}%
        </p>
        <p>
          <strong>현재 금융 점수:</strong> {userInfo.financialScore || 0}/100
        </p>
      </div>
    </div>
  );
};

export default User;
