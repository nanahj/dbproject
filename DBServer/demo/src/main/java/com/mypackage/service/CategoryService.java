package com.mypackage.service;

import com.mypackage.entity.Category;
import com.mypackage.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // 모든 카테고리 조회
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // 카테고리 유형별 조회 (수입/지출)
    public List<Category> getCategoriesByType(Category.Type type) {
        return categoryRepository.findByType(type);
    }

    // 카테고리 생성
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }
}
