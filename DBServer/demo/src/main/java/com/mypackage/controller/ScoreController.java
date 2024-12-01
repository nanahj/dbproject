package com.mypackage.controller;

import com.mypackage.dto.ScoreDTO;
import com.mypackage.entity.Score;
import com.mypackage.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    // 모든 점수 조회
    @GetMapping
    public ResponseEntity<List<ScoreDTO>> getAllScores() {
        List<Score> scores = scoreService.getAllScores();
        // 엔티티 -> DTO 변환
        List<ScoreDTO> scoreDTOs = scores.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(scoreDTOs);
    }

    // 특정 사용자의 점수 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScoreDTO>> getScoresByUser(@PathVariable Integer userId) {
        List<Score> scores = scoreService.getScoresByUser(userId);
        if (scores.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // 엔티티 -> DTO 변환
        List<ScoreDTO> scoreDTOs = scores.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(scoreDTOs);
    }

    // 점수 생성
    @PostMapping
    public ResponseEntity<ScoreDTO> createScore(@RequestBody ScoreDTO scoreDTO) {
        Score score = convertToEntity(scoreDTO); // DTO -> 엔티티 변환
        Score createdScore = scoreService.createScore(score);
        return ResponseEntity.ok(convertToDTO(createdScore));
    }

    // 엔티티 -> DTO 변환
    private ScoreDTO convertToDTO(Score score) {
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setUserId(score.getUserId());
        scoreDTO.setAverageIncome(score.getAverageIncome());
        scoreDTO.setAverageExpense(score.getAverageExpense());
        scoreDTO.setFixedExpense(score.getFixedExpense());
        scoreDTO.setVariableExpense(score.getVariableExpense()); // 추가
        scoreDTO.setSavings(score.getSavings());
        scoreDTO.setEmergencyFund(score.getEmergencyFund());
        scoreDTO.setTargetSavings(score.getTargetSavings()); // 추가
        scoreDTO.setAchievementRate(score.getAchievementRate());
        scoreDTO.setFinancialScore(score.getFinancialScore());
        return scoreDTO;
    }

    // DTO -> 엔티티 변환
    private Score convertToEntity(ScoreDTO scoreDTO) {
        Score score = new Score();
        score.setUserId(scoreDTO.getUserId());
        score.setAverageIncome(scoreDTO.getAverageIncome());
        score.setAverageExpense(scoreDTO.getAverageExpense());
        score.setFixedExpense(scoreDTO.getFixedExpense());
        score.setVariableExpense(scoreDTO.getVariableExpense()); // 추가
        score.setSavings(scoreDTO.getSavings());
        score.setEmergencyFund(scoreDTO.getEmergencyFund());
        score.setTargetSavings(scoreDTO.getTargetSavings()); // 추가
        score.setAchievementRate(scoreDTO.getAchievementRate());
        score.setFinancialScore(scoreDTO.getFinancialScore());
        return score;
    }

}
