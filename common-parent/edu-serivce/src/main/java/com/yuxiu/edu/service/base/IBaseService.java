package com.yuxiu.edu.service.base;

/**
 * Created by shRstart on 2019/8/23.
 */
public interface IBaseService<T> {
    public T findEcation();
    public T findById(Integer id);
    public T findByUUId(String uuid);
    public void deleteById(Integer id);
    public void deleteByUUId(String uuid);

}
