package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.Weather;

@Mapper
public interface WeatherMapper {
    
    public List<Weather> findAll(); 
    
}
