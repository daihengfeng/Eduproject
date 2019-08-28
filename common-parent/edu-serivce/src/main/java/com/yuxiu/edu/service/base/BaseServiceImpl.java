package com.yuxiu.edu.service.base;

import com.yuxiu.edu.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;

/**
 * Created by shRstart on 2019/8/23.
 */
public abstract class BaseServiceImpl<T> implements IBaseService<T>{
//      统一管理dao
       @Autowired
    protected UserMapper userMapper;
}
