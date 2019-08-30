package com.yuxiu.edu.service;

import com.yuxiu.edu.model.Employee;
import com.yuxiu.edu.model.User;
import com.yuxiu.edu.service.base.IBaseService;

/**
 * Created by shRstart on 2019/8/23.
 */
public interface ErpService extends IBaseService<Employee> {
//  特有的方法
    public Employee login(String username, String password);
//    查询所有的人员
    public Employee employee();
}
