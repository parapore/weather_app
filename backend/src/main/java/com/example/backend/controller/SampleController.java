package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.entity.Weather;
import com.example.backend.mapper.WeatherMapper;

@RestController
public class SampleController {
    @Autowired
    WeatherMapper weatherMapper;

    // @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public List<Weather> findWeather() {
        List<Weather> result = weatherMapper.findAll();
        return result;
    }
}
