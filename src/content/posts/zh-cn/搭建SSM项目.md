---
title: 搭建SSM项目
description: 使用Spring6 + SpringMVC + Mybatis3 + C3P0搭建SSM项目
publishDate: 2024-06-17
duration: 7分钟
authors: Avenue-opposites
tags: [SSM, Spring, SpringMVC, Mybatis, C3P0]
lang: zh-CN
---

## 如何搭建？

1. 创建一个默认的maven项目，即新建一个项目。
2. 右键项目根目录，选择**添加框架支持**，选中**web应用程序**。
    > 注意：如果web目录出现在根目录就移动到/src/main目录下，将文件夹名称修改为webapp。
3. 在pom.xml文件中添加一行代码，`<packaging>war</packaging>`，将maven打包类型设置为war包。
4. 添加项目依赖，在pom.xml中添加以下代码。
   - 设置项目依赖版本号。
   ```xml
   <properties>
        <maven.compiler.source>20</maven.compiler.source>  
        <maven.compiler.target>20</maven.compiler.target>  
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!-- 在这个标签中添加 -->
        <spring.version>6.1.6</spring.version>
        <mybatis.version>3.5.15</mybatis.version>
        <mybatis-spring.version>3.0.3</mybatis-spring.version>
        <mysql-driver.version>8.0.33</mysql-driver.version>
        <c3p0.version>0.9.5.5</c3p0.version>
        <servlet-api.version>6.0.0</servlet-api.version>
        <jstl.version>3.0.0</jstl.version>
        <junit.version>4.13.2</junit.version>
        <log4j.version>2.23.1</log4j.version>
   </properties>
   ```
   - 设置项目依赖
    ```xml
    <!-- Spring Core -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <!-- Spring MVC -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <!-- MyBatis -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>${mybatis.version}</version>
    </dependency>

    <!-- MyBatis Spring -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>${mybatis-spring.version}</version>
    </dependency>

    <!-- MySQL Driver -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql-driver.version}</version>
    </dependency>

    <!-- C3P0 -->
    <dependency>
      <groupId>com.mchange</groupId>
      <artifactId>c3p0</artifactId>
      <version>${c3p0.version}</version>
    </dependency>

    <!-- Spring JDBC -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <!-- Spring Transaction -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <!-- Spring Test (Optional, for testing purposes) -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>${spring.version}</version>
      <scope>test</scope>
    </dependency>

    <!-- Servlet API -->
    <dependency>
      <groupId>jakarta.servlet</groupId>
      <artifactId>jakarta.servlet-api</artifactId>
      <version>${servlet-api.version}</version>
      <scope>provided</scope>
    </dependency>

    <!-- JSTL API -->
    <dependency>
      <groupId>jakarta.servlet.jsp.jstl</groupId>
      <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
      <version>${jstl.version}</version>
    </dependency>

    <!-- JSTL Implementation -->
    <dependency>
      <groupId>org.glassfish.web</groupId>
      <artifactId>jakarta.servlet.jsp.jstl</artifactId>
      <version>${jstl.version}</version>
    </dependency>

    <!-- JSP -->
    <dependency>
      <groupId>jakarta.servlet.jsp</groupId>
      <artifactId>jakarta.servlet.jsp-api</artifactId>
      <version>3.0.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- taglib -->
    <dependency>
      <groupId>org.apache.taglibs</groupId>
      <artifactId>taglibs-standard-impl</artifactId>
      <version>1.2.5</version>
    </dependency>

    <!-- junit -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>${junit.version}</version>
      <scope>test</scope>
    </dependency>

    <!-- log4j -->
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-core</artifactId>
      <version>${log4j.version}</version>
    </dependency>
    </dependencies>
   ```
   > 注意：如果下载不了依赖，就使用本地依赖。
5. 创建数据库(省略)。
6. 创建application.xml文件。
    ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

        <!-- 开启组件扫描 -->
        <context:component-scan base-package="com.pzj" />

        <!-- 开启事务注解驱动 -->
        <tx:annotation-driven />

        <!-- 配置数据源 -->
        <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
            <property name="driverClass" value="com.mysql.cj.jdbc.Driver" />
            <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/table_demo" />
            <property name="user" value="root" />
            <property name="password" value="" />
        </bean>

        <!-- 配置SqlSessionFactory -->
        <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
            <property name="dataSource" ref="dataSource" />
            <property name="typeAliasesPackage" value="com.pzj.model" />
        </bean>

        <!-- 配置SqlSessionTemplate -->
        <bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
            <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory" />
        </bean>

        <!-- 配置mapper扫描 -->
        <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
            <property name="basePackage" value="com.pzj.mapper" />
        </bean>

        <!-- 配置事务管理器 -->
        <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
            <property name="dataSource" ref="dataSource" />
        </bean>
   </beans>
   ```
7. 创建spring-mvc.xml文件。
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

        <!-- 开启组件扫描 -->
        <context:component-scan base-package="com.pzj.controller" />

        <!-- 开启mvc注解驱动 -->
        <mvc:annotation-driven/>

        <!-- 配置视图解析器 -->
        <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
            <property name="prefix" value="/pages/"/>
            <property name="suffix" value=".jsp"/>
        </bean>
   </beans>
   ```
8. 修改web.xml文件。
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
        version="4.0">

	    <welcome-file-list>
		    <welcome-file>index.jsp</welcome-file>
	    </welcome-file-list>

	    <!-- 配置上下文加载器 -->
	    <listener>
		    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	    </listener>

	    <!--  配置应用上下文，设置配置文件的位置  -->
	    <context-param>
		    <param-name>contextConfigLocation</param-name>
		    <param-value>classpath:application.xml</param-value>
	    </context-param>

	    <!-- 配置DispatcherServlet -->
	    <servlet>
		    <servlet-name>app</servlet-name>
		    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		    <!-- 设置初始化参数，即springmvc的配置文件位置 -->
		    <init-param>
			    <param-name>contextConfigLocation</param-name>
			    <param-value>classpath:spring-mvc.xml</param-value>
		    </init-param>
		    <load-on-startup>1</load-on-startup>
	    </servlet>

	    <!-- 配置DispatcherServlet的映射 -->
	    <servlet-mapping>
		    <servlet-name>app</servlet-name>
		    <url-pattern>/</url-pattern>
	    </servlet-mapping>

	    <!-- 配置编码过滤器 -->
	    <filter>
		    <filter-name>encodingFilter</filter-name>
		    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		    <!-- 设置编码 -->
		    <init-param>
			    <param-name>encoding</param-name>
			    <param-value>UTF-8</param-value>
		    </init-param>
		    <!-- 是否强制编码 -->
		    <init-param>
			    <param-name>forceEncoding</param-name>
			    <param-value>true</param-value>
		    </init-param>
	    </filter>

	    <!-- 配置编码过滤器的映射 -->
	    <filter-mapping>
		    <filter-name>encodingFilter</filter-name>
		    <url-pattern>/*</url-pattern>
	    </filter-mapping>
   </web-app>
   ```
9. 创建User实体类，需要实现Serializable，getter和setter，以及toString。
   ```java
   package com.pzj.model;

   import java.io.Serializable;

   public class User implements Serializable {
        private int id;
        private String name;
        private String password;
   
        //.....省略getter和setter，toString方法，实现序略
   }
   ```
10. 创建UserMapper接口。
   ```java
   package com.pzj.mapper;

   import com.pzj.model.User;
   import org.apache.ibatis.annotations.Select;

   import java.util.List;

   public interface UserMapper {
        @Select("select * from user")
        List<User> findAll();
   }
   ```
11. 创建UserService接口和实现类。
   ```java
   package com.pzj.service;

   import com.pzj.model.User;

   import java.util.List;

   public interface UserService {

        List<User> findAll();
   }
   ```
   ```java
   package com.pzj.service;

    import com.pzj.mapper.UserMapper;
    import com.pzj.model.User;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class UserServiceImpl implements UserService{
        private UserMapper userMapper;

        public UserServiceImpl(UserMapper userMapper) {
            this.userMapper = userMapper;
        }

        @Override
        public List<User> findAll() {
            return userMapper.findAll();
        }
    }
   ```
12. 创建UserController类。
   ```java
   package com.pzj.controller;

    import com.pzj.service.UserService;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.servlet.ModelAndView;

    @RequestMapping("/user")
    @Controller
    public class UserController {
        private UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        @RequestMapping
        public ModelAndView index() {
            ModelAndView mv = new ModelAndView("user-list");
            mv.addObject("users", userService.findAll());
            return mv;
        }
    }
   ```
> 此时项目结构如下：
   ```text
   src
   |--main
   |  |--java
   |  |  |--com
   |  |  |  |--pzj
   |  |  |  |  |--controller
   |  |  |  |  |  |--UserController.java
   |  |  |  |  |--service
   |  |  |  |  |  |--UserService.java
   |  |  |  |  |  |--UserServiceImpl.java
   |  |  |  |  |--model
   |  |  |  |  |  |--User.java
   |  |  |  |  |--mapper
   |  |  |  |  |  |--UserMapper.java
   |  |--resources
   |  |  |--application.xml // spring的配置文件
   |  |  |--spring-mvc.xml // spring mvc的配置文件
   |  |--webapp
   |  |  |--WEB-INF
   |  |  |  |--web.xml // servlet的配置文件
   |  |  |--pages
   |  |  |--index.jsp
   ```
> taglibs: `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
13. 添加tomcat启动脚本，启动项目。
14. 访问项目地址：http://localhost:8080/user