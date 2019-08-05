package com.lunas.fsd.controller;
import	java.lang.reflect.Parameter;

import com.lunas.fsd.entity.UserInfo;
import com.lunas.fsd.pojo.JsonResult;
import com.lunas.fsd.pojo.LoginUser;
import com.lunas.fsd.pojo.SalaryForm;
import com.lunas.fsd.service.CalService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class LoginController {

    @Autowired
    CalService calService;

    @RequestMapping("/index")
    public String goHome(Map<String, Object> paramMap) {
        /** 默认Map的内容会放大请求域中，页面可以直接使用Thymeleaf取值*/
        paramMap.put("name", "张三");
        paramMap.put("age", 35);
        return "index2";
    }

    // Login form
    @RequestMapping("/login.html")
    public String login(HttpServletResponse response) {

        return "login.html";
    }

    // Login form with error
    @RequestMapping("/login-error.html")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        return "login.html";
    }


    /**
     *
     * @return
     */
    @PostMapping("/cal")
    @ResponseBody
    public  JsonResult cal(@Validated SalaryForm form, BindingResult bindingResult ){
        JsonResult result = new JsonResult();
        if(bindingResult.hasErrors()){
            result.setStatus("error");
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errors.add(fieldError.getField()+fieldError.getDefaultMessage());
            }
            result.getResult().put("errors",errors);

        }else {
            result.setStatus("success");
            result.getResult().put("list",calService.calSalary(form));
        }

       return result ;

    }



}
