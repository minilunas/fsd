package com.lunas.fsd.security;


import com.lunas.fsd.entity.UserInfo;
import com.lunas.fsd.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 认证和授权
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserInfoService userInfoService;

//    @Autowired
//    private MenuService menuService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        //--------------------认证账号
        User user = userInfoService.loadUserByUsername(s);
        if (user == null) {
            throw new UsernameNotFoundException("账号不存在");
        }


        return user;

    }

}
