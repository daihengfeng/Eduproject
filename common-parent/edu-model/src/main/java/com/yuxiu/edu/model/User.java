package com.yuxiu.edu.model;

/**
 * Created by shRstart on 2019/8/22.
 */
public class User {
    private int id;
    private String username;
        private String userpwd;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return userpwd;
    }

    public void setPassword(String password) {
        this.userpwd = userpwd;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userpwd='" + userpwd + '\'' +
                '}';
    }
}
