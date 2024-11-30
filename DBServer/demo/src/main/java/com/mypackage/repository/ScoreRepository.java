package com.mypackage.repository;

import com.mypackage.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Integer> {
    // 특정 사용자의 특정 월 점수 검색
    Score findByUserUserIdAndMonth(Integer userId, String month);

    // 특정 사용자의 모든 점수 검색
    List<Score> findByUserUserId(Integer userId);
}
