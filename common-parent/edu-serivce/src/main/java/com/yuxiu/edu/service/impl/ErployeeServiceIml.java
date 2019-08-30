package com.yuxiu.edu.service.impl;

import com.yuxiu.edu.mapper.EmployeeMapper;
import com.yuxiu.edu.model.Employee;
import com.yuxiu.edu.model.EmployeeExample;
import com.yuxiu.edu.model.User;
import com.yuxiu.edu.service.ErpService;
import com.yuxiu.edu.service.IUserService;
import com.yuxiu.edu.service.base.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.ErrorManager;

/**
 * Created by shRstart on 2019/8/23.
 */
@Service
@Transactional
public class ErployeeServiceIml extends BaseServiceImpl<Employee> implements ErpService {
    @Autowired
    private EmployeeMapper employeeMapper;
    @Override
    public Employee login(String username, String password) {
        return null;
    }

    @Override
    public Employee employee() {
        return null;
    }


    @Override
    public Employee findEcation() {
        EmployeeExample example = new EmployeeExample();
        List<Employee> employees = employeeMapper.selectByExample(example);
        return (Employee) employees;
    }

    @Override
    public Employee findById(Integer id) {
        return null;
    }

    @Override
    public Employee findByUUId(String uuid) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }

    @Override
    public void deleteByUUId(String uuid) {

    }




}
