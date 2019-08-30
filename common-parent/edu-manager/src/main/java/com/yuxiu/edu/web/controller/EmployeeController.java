package com.yuxiu.edu.web.controller;

import com.yuxiu.edu.model.Employee;
import com.yuxiu.edu.model.User;
import com.yuxiu.edu.service.ErpService;
import com.yuxiu.edu.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by shRstart on 2019/8/23.
 */
@Controller
@RequestMapping("employee")
public class EmployeeController {

    @Autowired
    private ErpService erpService;
//    跳转页面
    @RequestMapping("manage")
    public String manage(){
          return "employee/manage";
    }
    //
    @RequestMapping("info")
    public String info(){
        return "employee/info";
    }
    //页面里面的新增
    @RequestMapping("edit")
    public String edit(){
          return "employee/edit";
    }
//    查出全部的员工
    @RequestMapping("selecteris")
    public String selecteris(Model model){
     Employee employee = erpService.findEcation();
        System.out.println(employee);
        System.out.println(11111);
     model.addAttribute("emp",employee);
        return null;
    }
}
