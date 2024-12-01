package com.mypackage.controller;

import com.mypackage.entity.Category;
import com.mypackage.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // 모든 카테고리 조회
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // 카테고리 유형별 조회
    @GetMapping("/type")
    public ResponseEntity<List<Category>> getCategoriesByType(@RequestParam String type) {
        Category.Type categoryType = Category.Type.valueOf(type);
        List<Category> categories = categoryService.getCategoriesByType(categoryType);
        return ResponseEntity.ok(categories);
    }

    // 카테고리 생성
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(createdCategory);
    }
}
