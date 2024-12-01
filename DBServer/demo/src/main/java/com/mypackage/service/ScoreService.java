package com.mypackage.service;

import com.mypackage.entity.Score;
import com.mypackage.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return scoreRepository.findByUserId(userId);
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
