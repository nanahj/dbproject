package com.mypackage.repository;

import com.mypackage.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    // 특정 사용자의 모든 수입/지출 내역 검색
    List<Expense> findByUserUserId(Integer userId);

    // 특정 날짜 범위의 수입/지출 검색
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // 특정 카테고리의 수입/지출 검색
    List<Expense> findByCategoryCategoryId(Integer categoryId);
}
