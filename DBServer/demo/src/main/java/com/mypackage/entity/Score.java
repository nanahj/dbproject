package com.mypackage.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scoreId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal averageIncome;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal averageExpense;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal fixedExpense;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal variableExpense;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal savings;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal emergencyFund;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal targetSavings;

    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal achievementRate;

    @Column(nullable = false)
    private Integer financialScore;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Getters and Setters

    public Integer getScoreId() {
        return scoreId;
    }

    public void setScoreId(Integer scoreId) {
        this.scoreId = scoreId;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
