package com.lunas.fsd.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) //开启方法权限控制
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder  auth) throws  Exception{
        auth.userDetailsService(customUserDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.formLogin()                    //  定义当需要用户登录时候，转到的登录页面。
                .loginPage("/login.html")           // 设置登录页面
                .loginProcessingUrl("/user/login")  // 自定义的登录接口
                .successHandler(new MyAuthenctiationSuccessHandler()) // 自定义登录成功处理
                .failureHandler(new MyAuthenctiationFailureHandler()) // 自定义登录失败处理
//                .failureUrl("/login-error.html")
                .and()
                .authorizeRequests()        // 定义哪些URL需要被保护、哪些不需要被保护
                .antMatchers("/login.html","/authentication/require").permitAll()     // 设置所有人都可以访问登录页面
                .anyRequest()               // 任何请求,登录后可以访问
                .authenticated()
                .and()
                .csrf().disable();          // 关闭csrf防护
    }



//
//    /**
//     * 自定义UserDetailsService，授权
//     * @return
//     */
//    @Bean
//    public CustomUserDetailsService customUserDetailsService(){
//        return new CustomUserDetailsService();
//    }

    /**
     * AuthenticationManager
     * @return
     * @throws Exception
     */
    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
