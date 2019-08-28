package com.yuxiu.edu.web.controller;

import com.yuxiu.edu.model.User;
import com.yuxiu.edu.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by shRstart on 2019/8/23.
 */
@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    private IUserService userService;

      @RequestMapping("login")
     public String login(){
         System.out.println("............");
         return  "Default";
     }

    @RequestMapping("find")
    public String find(Integer id){
        System.out.println("............");
        User user = userService.findById(id);
        System.out.println(user);
        return  null;
    }
//    跳转页面
    @RequestMapping("manage")
    public String manage(){
          return "User/UserManage";
    }
    //
    @RequestMapping("info")
    public String info(){
        return "User/UserInfo";
    }
    //页面里面的新增
    @RequestMapping("edit")
    public String edit(){
          return "/User/UserEdit";
    }
}
