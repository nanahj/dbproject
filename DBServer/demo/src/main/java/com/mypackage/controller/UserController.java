package com.mypackage.controller;

import com.mypackage.dto.UserDTO;
import com.mypackage.dto.ExpenseDTO;
import com.mypackage.entity.User;
import com.mypackage.entity.Expense;
import com.mypackage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // User -> UserDTO 변환
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());

        // Expense -> ExpenseDTO 변환
        List<ExpenseDTO> expenseDTOs = user.getExpenses().stream()
            .map(expense -> {
                ExpenseDTO expenseDTO = new ExpenseDTO();
                expenseDTO.setExpenseId(expense.getExpenseId());
                expenseDTO.setAmount(expense.getAmount());
                expenseDTO.setType(expense.getType().name());
                expenseDTO.setDescription(expense.getDescription());
                expenseDTO.setDate(expense.getDate());
                return expenseDTO;
            }).collect(Collectors.toList());

        userDTO.setExpenses(expenseDTOs);

        return ResponseEntity.ok(userDTO);
    }
}
