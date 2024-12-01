import React, { useState } from "react";
import axiosClient from "../api/axiosClient"; // Axios 클라이언트
import "../styles/Score.css";
import { useUser } from "../components/UserContext";

const Score = () => {
  const { userInfo, setUserInfo } = useUser();
  const [averageIncome, setAverageIncome] = useState(0); // 월 평균 수입
  const [averageExpense, setAverageExpense] = useState(0); // 월 평균 지출
  const [variableExpense, setVariableExpense] = useState(0); // 가변 지출
  const [savings, setSavings] = useState(0); // 저축 금액
  const [emergencyFund, setEmergencyFund] = useState(0); // 비상 자금
  const [targetSavings, setTargetSavings] = useState(0); // 목표 저축
  const [fixedExpense, setFixedExpense] = useState(0); // 고정 지출
  const [achievementRate, setAchievementRate] = useState(0); // 목표 달성률 (%)
  const [score, setScore] = useState(null); // 계산된 금융 점수

  // 점수 계산
  const calculateScore = async () => {
    // 수입/지출 비율 점수
    const scoreIncomeExpense = Math.max(
      100 - (averageExpense / averageIncome) * 100,
      0
    );

    // 저축률 점수
    const scoreSavings = Math.min((savings / averageIncome) * 100, 100);

    // 비상 자금 점수
    const scoreEmergency = Math.min(
      (emergencyFund / fixedExpense) * 100,
      100
    );

    // 목표 저축 달성률 점수
    const scoreTarget = achievementRate;

    // 최종 금융 점수 계산
    const financialScore =
      scoreIncomeExpense * 0.4 +
      scoreSavings * 0.3 +
      scoreEmergency * 0.2 +
      scoreTarget * 0.1;

    const finalScore = financialScore.toFixed(2); // 소수점 2자리로 표시
    setScore(finalScore);

     // 점수 계산 및 UserContext 업데이트
    try {
      await axiosClient.post("/scores", {
        averageIncome,
        averageExpense,
        savings,
        emergencyFund,
        fixedExpense,
        variableExpense,
        targetSavings,
        achievementRate,
        financialScore: finalScore,
      });

      // UserContext 업데이트
      setUserInfo((prev) => ({
        ...prev,
        financialScore: finalScore, // UserContext에 최종 점수 저장
      }));

      console.log("Score saved and context updated successfully!");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="score-page">
      <h2>금융 점수 계산기</h2>
      <div className="input-fields">
        <div className="input-field">
          <label>월 평균 수입 (원): </label>
          <input
            type="number"
            value={averageIncome}
            onChange={(e) => setAverageIncome(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>월 평균 지출 (원): </label>
          <input
            type="number"
            value={averageExpense}
            onChange={(e) => setAverageExpense(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>저축 금액 (원): </label>
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>비상 자금 (원): </label>
          <input
            type="number"
            value={emergencyFund}
            onChange={(e) => setEmergencyFund(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>목표 저축 (원): </label>
          <input
            type="number"
            value={targetSavings}
            onChange={(e) => setTargetSavings(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>고정 지출 (원): </label>
          <input
            type="number"
            value={fixedExpense}
            onChange={(e) => setFixedExpense(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
        <label>가변 지출 (원): </label>
        <input
          type="number"
          value={variableExpense}
          onChange={(e) => setVariableExpense(Number(e.target.value))}
        />
      </div>
        <div className="input-field">
          <label>목표 달성률 (%): </label>
          <input
            type="number"
            value={achievementRate}
            onChange={(e) => setAchievementRate(Number(e.target.value))}
          />
        </div>
      </div>

      <button onClick={calculateScore} className="calculate-btn">
        점수 계산 및 저장
      </button>

      {score !== null && (
        <div className="score-result">
          <h3>최종 금융 점수: {score}</h3>
        </div>
      )}
    </div>
  );
};

export default Score;
