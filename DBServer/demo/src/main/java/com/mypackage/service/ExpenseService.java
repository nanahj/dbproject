package com.mypackage.service;

import com.mypackage.entity.Expense;
import com.mypackage.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // 모든 수입/지출 조회
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // 사용자별 수입/지출 조회
    public List<Expense> getExpensesByUser(Integer userId) {
        return expenseRepository.findByUserUserId(userId);
    }

    // 특정 날짜 범위의 수입/지출 조회
    public List<Expense> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    // 수입/지출 생성
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // 수입/지출 삭제
    public void deleteExpense(Integer expenseId) {
        expenseRepository.deleteById(expenseId);
    }
}
