package com.mypackage.controller;

import com.mypackage.dto.ExpenseDTO;
import com.mypackage.entity.Expense;
import com.mypackage.entity.User;
import com.mypackage.entity.Category;
import com.mypackage.service.ExpenseService;
import com.mypackage.service.UserService;
import com.mypackage.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    // 모든 수입/지출 조회
    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        List<ExpenseDTO> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    // 특정 사용자의 수입/지출 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByUser(@PathVariable Integer userId) {
        List<ExpenseDTO> expenses = expenseService.getExpensesByUser(userId);
        return ResponseEntity.ok(expenses);
    }

    // 특정 날짜 범위의 수입/지출 조회
    @GetMapping("/date-range")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<ExpenseDTO> expenses = expenseService.getExpensesByDateRange(start, end);
        return ResponseEntity.ok(expenses);
    }

    // 수입/지출 생성
    @PostMapping
    public ResponseEntity<ExpenseDTO> createExpense(@RequestBody ExpenseDTO request) {
        // User 및 Category 엔티티 조회
        User user = userService.getUserById(request.getUserId()).orElse(null);
        Category category = categoryService.getCategoryById(request.getCategoryId());

        if (user == null || category == null) {
            return ResponseEntity.badRequest().build(); // 유효하지 않은 userId 또는 categoryId
        }

        // Expense 엔티티 생성 및 설정
        Expense expense = new Expense();
        expense.setUser(user);
        expense.setCategory(category);
        expense.setAmount(request.getAmount());
        expense.setType(Expense.Type.valueOf(request.getType()));
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());

        Expense createdExpense = expenseService.createExpense(expense);
        // 생성된 Expense를 DTO로 변환하여 반환
        ExpenseDTO response = new ExpenseDTO();
        response.setUserId(createdExpense.getUser().getUserId());
        response.setCategoryId(createdExpense.getCategory().getCategoryId());
        response.setAmount(createdExpense.getAmount());
        response.setType(createdExpense.getType().name());
        response.setDescription(createdExpense.getDescription());
        response.setDate(createdExpense.getDate());

        return ResponseEntity.ok(response);
    }

    // 수입/지출 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
