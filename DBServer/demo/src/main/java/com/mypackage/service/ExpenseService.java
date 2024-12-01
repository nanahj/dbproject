package com.mypackage.service;

import com.mypackage.dto.ExpenseDTO;
import com.mypackage.entity.Expense;
import com.mypackage.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // 모든 수입/지출 조회
    public List<ExpenseDTO> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return expenses.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // 사용자별 수입/지출 조회
    public List<ExpenseDTO> getExpensesByUser(Integer userId) {
        List<Expense> expenses = expenseRepository.findByUserUserId(userId);
        return expenses.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // 특정 날짜 범위의 수입/지출 조회
    public List<ExpenseDTO> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Expense> expenses = expenseRepository.findByDateBetween(startDate, endDate);
        return expenses.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // 수입/지출 생성
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // 수입/지출 삭제
    public void deleteExpense(Integer expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    // Expense 엔티티를 ExpenseDTO로 변환
    private ExpenseDTO convertToDTO(Expense expense) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setUserId(expense.getUser().getUserId());
        dto.setCategoryId(expense.getCategory().getCategoryId());
        dto.setAmount(expense.getAmount());
        dto.setType(expense.getType().name());
        dto.setDescription(expense.getDescription());
        dto.setDate(expense.getDate());
        return dto;
    }
}
