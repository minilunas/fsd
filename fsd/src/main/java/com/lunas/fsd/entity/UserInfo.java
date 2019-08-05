package com.lunas.fsd.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity  //代表此类为一个表的映射entity类
@Table(name="user_info")  //设置对应的表名
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class UserInfo implements  Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String fullName;

    private String email;
    private String userName;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "uer_role", joinColumns = {@JoinColumn(name = "roleId", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "userId", referencedColumnName = "id")})
    private Set<Role> roles;
}
