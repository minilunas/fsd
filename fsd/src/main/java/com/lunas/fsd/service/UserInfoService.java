package com.lunas.fsd.service;

import com.lunas.fsd.dao.UserInfoRepository;
import com.lunas.fsd.entity.UserInfo;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserInfoService {
    @Autowired
    UserInfoRepository userInfoRepository;

    public User loadUserByUsername(String uername) {
        UserInfo userInfo = userInfoRepository.findByUserName(uername);
        StringBuffer roleBuffer = new StringBuffer();
        userInfo.getRoles().forEach(role -> roleBuffer.append(role.getKey()).append(","));
        // 封装用户信息，并返回。参数分别是：用户名，密码，用户权限
        User user = new User(userInfo.getUserName(), userInfo.getPassword(),
                AuthorityUtils.commaSeparatedStringToAuthorityList(roleBuffer.toString()));
        return user;
    }
}
