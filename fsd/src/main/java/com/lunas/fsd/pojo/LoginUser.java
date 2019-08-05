package com.lunas.fsd.pojo;

import com.lunas.fsd.entity.UserInfo;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@EqualsAndHashCode
public class LoginUser extends UserInfo {
    private String imgKaptcha;
    private String inputKaptcha;
}
