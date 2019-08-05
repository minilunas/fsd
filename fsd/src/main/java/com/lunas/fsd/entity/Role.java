package com.lunas.fsd.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity  //代表此类为一个表的映射entity类
@Table(name="role")  //设置对应的表名
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class Role implements  Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String key;
    private String name;

}
