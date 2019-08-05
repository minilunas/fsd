package com.lunas.fsd.pojo;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class BaseResponse {
    String status;
    String msg;
    private String jwtToken;

    Map<String,Object> data;
    public BaseResponse(String msg) {
        this.msg = msg;
    }

    public BaseResponse(String status, String msg) {
        this.status = status;
        this.msg = msg;
    }
}
