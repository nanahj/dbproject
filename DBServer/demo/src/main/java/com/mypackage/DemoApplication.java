package com.mypackage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.mypackage.DemoApplication;

@SpringBootApplication
@ComponentScan(basePackages = {"com.mypackage", "com.example.demo"})  // 패키지 스캔 경로 추가
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
