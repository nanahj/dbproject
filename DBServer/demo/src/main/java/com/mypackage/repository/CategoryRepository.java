package com.mypackage.repository;

import com.mypackage.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // 카테고리 유형(수입/지출)으로 검색
    List<Category> findByType(Category.Type type);
}
