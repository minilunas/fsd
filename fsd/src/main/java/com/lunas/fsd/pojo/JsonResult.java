package com.lunas.fsd.pojo;

import java.util.HashMap;
import java.util.Map;

public class JsonResult {
    String status;
    Map<String,Object> result = new HashMap<>();

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Map<String, Object> getResult() {
        return result;
    }

    public void setResult(Map<String, Object> result) {
        this.result = result;
    }
}
