package com.yuxiu.edu.web.controller;

import com.yuxiu.edu.model.User;
import com.yuxiu.edu.service.IUserService;
import com.yuxiu.edu.web.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by shRstart on 2019/8/23.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User> {
    @Autowired
    private IUserService userService;

      @RequestMapping("login")
     public String login(){
         System.out.println("............");
         return  "Default";
     }

    @RequestMapping("find")
    public String find(Integer id){
        User user = userService.findById(id);
        System.out.println(user);
        return  null;
    }
//    跳转管理页面
    @RequestMapping("manage")
    public String manage(){
          return MANAGA_PAGE;
    }
    //列表页面
    @RequestMapping("info")
    public String info(){
        return INFO_PAGE;
    }
    //页面里面的新增  编辑页面
    @RequestMapping("edit")
    public String edit(){
          return EDIT_PAGE;
    }
}
