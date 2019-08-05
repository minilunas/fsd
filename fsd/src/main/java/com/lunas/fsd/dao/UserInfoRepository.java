package com.lunas.fsd.dao;

import com.lunas.fsd.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {


    UserInfo findByUserName(String username);
}