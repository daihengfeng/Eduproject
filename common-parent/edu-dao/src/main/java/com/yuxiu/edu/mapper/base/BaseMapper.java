package com.yuxiu.edu.mapper.base;

import com.yuxiu.edu.model.User;

/**
 * Created by shRstart on 2019/8/23.
 */
public interface BaseMapper<T> {
    public T findById(Integer id);
    public T findByUUId(String uuid);


    public void deleteById(Integer id);
    public void deleteByUUId(String uuid);


    public void update(T t);


    public void inster(T t);
}
