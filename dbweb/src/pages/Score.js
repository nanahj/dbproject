import React, { useState } from "react";
import "../styles/Score.css";

const Score = () => {
  // 상태 관리
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [debtRate, setDebtRate] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(0);
  const [score, setScore] = useState(null);

  // 점수 계산
  const calculateScore = () => {
    const incomeScore = Math.min((income / 10000) * 15, 100); // 월 수입에 따른 점수
    const expensesScore = Math.max(100 - (expenses / 1000) * 20, 0); // 월 지출에 따른 점수
    const savingsScore = Math.min(savingsRate * 20, 100); // 저축 비율에 따른 점수
    const debtScore = Math.max(100 - debtRate * 20, 0); // 부채 비율에 따른 점수
    const creditScoreWeight = Math.min(creditScore * 15, 100); // 신용 점수
    const emergencyFundScore = Math.min(emergencyFund * 10, 100); // 비상 자금 비율

    // 최종 점수 계산
    const totalScore =
      incomeScore +
      expensesScore +
      savingsScore +
      debtScore +
      creditScoreWeight +
      emergencyFundScore;

    setScore(totalScore.toFixed(2));
  };

  return (
    <div className="score-page">
      <h2>금융 점수 계산기</h2>
      <div className="input-fields">
        <div className="input-field">
          <label>월 수입 (원): </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>월 지출 (원): </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>저축 비율 (%): </label>
          <input
            type="number"
            value={savingsRate}
            onChange={(e) => setSavingsRate(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>부채 비율 (%): </label>
          <input
            type="number"
            value={debtRate}
            onChange={(e) => setDebtRate(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>신용 점수 (0-100): </label>
          <input
            type="number"
            value={creditScore}
            onChange={(e) => setCreditScore(Number(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>비상 자금 비율 (%): </label>
          <input
            type="number"
            value={emergencyFund}
            onChange={(e) => setEmergencyFund(Number(e.target.value))}
          />
        </div>
      </div>

      <button onClick={calculateScore} className="calculate-btn">
        점수 계산
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
