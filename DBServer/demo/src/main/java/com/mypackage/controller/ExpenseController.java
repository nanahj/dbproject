package com.mypackage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api")
public class ExpenseController {

    @GetMapping("/test")
    public String test() {
        return "Expense API is working!";
    }
}
