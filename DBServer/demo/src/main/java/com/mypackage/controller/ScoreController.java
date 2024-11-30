package com.mypackage.controller;

import com.mypackage.entity.Score;
import com.mypackage.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    // 모든 점수 조회
    @GetMapping
    public ResponseEntity<List<Score>> getAllScores() {
        List<Score> scores = scoreService.getAllScores();
        return ResponseEntity.ok(scores);
    }

    // 특정 사용자의 점수 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Score>> getScoresByUser(@PathVariable Integer userId) {
        List<Score> scores = scoreService.getScoresByUser(userId);
        return ResponseEntity.ok(scores);
    }

    // 특정 월의 점수 조회
    @GetMapping("/user/{userId}/month/{month}")
    public ResponseEntity<Score> getScoreByUserAndMonth(
            @PathVariable Integer userId,
            @PathVariable String month
    ) {
        Optional<Score> score = scoreService.getScoreByUserAndMonth(userId, month);
        return score.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // 점수 생성
    @PostMapping
    public ResponseEntity<Score> createScore(@RequestBody Score score) {
        Score createdScore = scoreService.createScore(score);
        return ResponseEntity.ok(createdScore);
    }
}
