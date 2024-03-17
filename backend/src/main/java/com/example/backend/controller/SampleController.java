package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.TestScore;
import com.example.backend.mapper.SampleMapper;

@RestController
public class SampleController {
    @Autowired
    SampleMapper sampleMapper;

    // @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/")  // ルートへこのメソッドをマップする
    public String test() {
        List<TestScore> result = sampleMapper.select();
        return result.toString();
    }
}
