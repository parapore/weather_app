package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.TestScore;

@Mapper
public interface SampleMapper {
    List<TestScore> select();
}
