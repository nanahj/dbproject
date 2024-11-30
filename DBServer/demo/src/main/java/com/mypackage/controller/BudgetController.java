package com.mypackage.controller;

import com.mypackage.entity.Budget;
import com.mypackage.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    // 모든 예산 조회
    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        List<Budget> budgets = budgetService.getAllBudgets();
        return ResponseEntity.ok(budgets);
    }

    // 특정 사용자의 예산 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Budget>> getBudgetsByUser(@PathVariable Integer userId) {
        List<Budget> budgets = budgetService.getBudgetsByUser(userId);
        return ResponseEntity.ok(budgets);
    }

    // 예산 생성
    @PostMapping
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budget) {
        Budget createdBudget = budgetService.createBudget(budget);
        return ResponseEntity.ok(createdBudget);
    }

    // 예산 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Integer id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}
