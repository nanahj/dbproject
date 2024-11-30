package com.mypackage.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scoreId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 7)
    private String month; // Format: "YYYY-MM"

    @Column(nullable = false)
    private BigDecimal averageIncome;

    @Column(nullable = false)
    private BigDecimal averageExpense;

    @Column
    private BigDecimal fixedExpense;

    @Column
    private BigDecimal variableExpense;

    @Column
    private BigDecimal savings;

    @Column
    private BigDecimal emergencyFund;

    @Column
    private BigDecimal targetSavings;

    @Column
    private BigDecimal achievementRate;

    @Column(nullable = false)
    private Integer financialScore;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Getters and Setters
    // Constructor
}
