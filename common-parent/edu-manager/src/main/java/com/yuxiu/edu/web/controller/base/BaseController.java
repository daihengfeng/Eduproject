package com.yuxiu.edu.web.controller.base;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * Created by shRstart on 2019/8/28.
 */
public abstract class BaseController<T> {

    public static String MANAGA_PAGE;//管理页面
    public static String INFO_PAGE;//列表页面
    public static String EDIT_PAGE;//



    public static final String MANAGA="manage";//管理页
    public static final String INFO="info";//列表
    public static final String EDIT="edit";

    //构造方法来给上面的赋值
    public BaseController(){
        //1.获取泛型的真实类型1111
        ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
        Class<?> modelClass = (Class<?>) type.getActualTypeArguments()[0];
        System.out.println("===="+modelClass);
        //2.模块名
       String modelName = modelClass.getSimpleName().toLowerCase();

//       3.给静态页面赋值
        MANAGA_PAGE = modelName+"/"+MANAGA;
        INFO_PAGE = modelName+"/"+INFO;
        EDIT_PAGE = modelName+""+EDIT;

    }
}
