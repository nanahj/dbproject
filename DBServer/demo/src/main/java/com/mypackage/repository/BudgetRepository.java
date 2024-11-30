package com.mypackage.repository;

import com.mypackage.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    // 특정 사용자의 모든 예산 내역 검색
    List<Budget> findByUserUserId(Integer userId);

    // 특정 카테고리의 예산 검색
    List<Budget> findByCategoryCategoryId(Integer categoryId);
}
