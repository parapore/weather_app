package com.example.backend.entity;

import lombok.Data;

@Data
public class TestScore {
    private int id;
    private int studentid;
    private String subject;
    private int score;
}
