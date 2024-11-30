package com.mypackage.service;

import com.mypackage.entity.Score;
import com.mypackage.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    // 모든 점수 조회
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    // 사용자별 점수 조회
    public List<Score> getScoresByUser(Integer userId) {
        return scoreRepository.findByUserUserId(userId);
    }

    // 특정 월의 점수 조회
    public Optional<Score> getScoreByUserAndMonth(Integer userId, String month) {
        return Optional.ofNullable(scoreRepository.findByUserUserIdAndMonth(userId, month));
    }

    // 점수 생성
    public Score createScore(Score score) {
        return scoreRepository.save(score);
    }

    // 점수 삭제
    public void deleteScore(Integer scoreId) {
        scoreRepository.deleteById(scoreId);
    }
}
