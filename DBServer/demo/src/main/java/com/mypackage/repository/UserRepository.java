package com.mypackage.repository;

import com.mypackage.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // 이메일을 기준으로 사용자 검색
    User findByEmail(String email);
}
