package com.yuxiu.edu.web.controller.base;

import java.lang.reflect.Type;

/**
 * Created by shRstart on 2019/8/28.
 */
public abstract class BaseController<T> {

    public static String MANAGA_PAGE;//管理页面
    public static String INFO_PAGE;//列表页面
    public static String EDIT_PAGE;//


    //构造方法来给上面的赋值
    public BaseController(){
        //1.获取泛型的真实类型
        Type type = this.getClass().getGenericSuperclass();
        System.out.println(type);
    }
}
