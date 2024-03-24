package com.example.backend.entity;

import lombok.Data;

@Data
public class Weather {
    private int id;
    private String prefecture;
    private int yyyy_mm;
    private int average_tempreture;
    private int summer_day;
    private int winter_day;
    private int sunny_day;
}
