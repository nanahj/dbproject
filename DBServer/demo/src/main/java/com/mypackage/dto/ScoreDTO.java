package com.mypackage.dto;

import java.math.BigDecimal;

public class ScoreDTO {
    private Integer userId;
    private BigDecimal averageIncome;
    private BigDecimal averageExpense;
    private BigDecimal fixedExpense;
    private BigDecimal variableExpense; // 추가
    private BigDecimal savings;
    private BigDecimal emergencyFund;
    private BigDecimal targetSavings; // 추가
    private BigDecimal achievementRate;
    private Integer financialScore;

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getAverageIncome() {
        return averageIncome;
    }

    public void setAverageIncome(BigDecimal averageIncome) {
        this.averageIncome = averageIncome;
    }

    public BigDecimal getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(BigDecimal averageExpense) {
        this.averageExpense = averageExpense;
    }

    public BigDecimal getFixedExpense() {
        return fixedExpense;
    }

    public void setFixedExpense(BigDecimal fixedExpense) {
        this.fixedExpense = fixedExpense;
    }

    public BigDecimal getVariableExpense() {
        return variableExpense;
    }

    public void setVariableExpense(BigDecimal variableExpense) {
        this.variableExpense = variableExpense;
    }

    public BigDecimal getSavings() {
        return savings;
    }

    public void setSavings(BigDecimal savings) {
        this.savings = savings;
    }

    public BigDecimal getEmergencyFund() {
        return emergencyFund;
    }

    public void setEmergencyFund(BigDecimal emergencyFund) {
        this.emergencyFund = emergencyFund;
    }

    public BigDecimal getTargetSavings() {
        return targetSavings;
    }

    public void setTargetSavings(BigDecimal targetSavings) {
        this.targetSavings = targetSavings;
    }

    public BigDecimal getAchievementRate() {
        return achievementRate;
    }

    public void setAchievementRate(BigDecimal achievementRate) {
        this.achievementRate = achievementRate;
    }

    public Integer getFinancialScore() {
        return financialScore;
    }

    public void setFinancialScore(Integer financialScore) {
        this.financialScore = financialScore;
    }
}
