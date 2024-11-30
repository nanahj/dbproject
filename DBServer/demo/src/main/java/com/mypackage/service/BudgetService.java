package com.mypackage.service;

import com.mypackage.entity.Budget;
import com.mypackage.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // 모든 예산 조회
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    // 사용자별 예산 조회
    public List<Budget> getBudgetsByUser(Integer userId) {
        return budgetRepository.findByUserUserId(userId);
    }

    // 예산 생성
    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    // 예산 삭제
    public void deleteBudget(Integer budgetId) {
        budgetRepository.deleteById(budgetId);
    }
}
