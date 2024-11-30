package com.mypackage.service;

import com.mypackage.entity.User;
import com.mypackage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 사용자 생성
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // 사용자 조회 (ID로)
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    // 사용자 조회 (이메일로)
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    // 사용자 업데이트
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // 사용자 삭제
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
