package com.springboot.spring_mailer;

import com.springboot.spring_mailer.services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.awt.*;
import java.io.*;

@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;

    @Test
    void emailSendTest(){
        System.out.println("Sending Email...");
        emailService.sendEmail("shadabfaisal91@gmail.com","Email from SpringBoot", "Demo email sent using SpringBoot. Thanks!");
    }

    @Test
    void emailSendTestToMultipleUser(){
        System.out.println("Sending Email...");
        emailService.sendEmail(new String[]{"shadabfaisal91@gmail.com","sf956822@gmail.com"},"Email from SpringBoot", "Demo email sent using SpringBoot. Thanks!");
    }

    @Test
    void sendEmailWithHtml(){
        String html=""+"<h1 style='color:red;border: 1px solid red'>Welcome to SpringBoot family</h1>"+"";
        System.out.println("Sending Email...");
        emailService.sendEmailWithHtml("shadabfaisal91@gmail.com","Email from SpringBoot", html);


    }

    @Test
    void sendEmailWithFile(){
        emailService.sendEmailWithFile("shadabfaisal91@gmail.com",
                "Email with File",
                "This email contains a file that is sent using SpringBoot.",
                new File("C:/Users/HP/Desktop/Study Materials/Projects/Email-Sender-App/Backend/spring-mailer/src/main/resources/static/Snowflake Certificate_page-0001.jpg"));
    }


    @Test
    void sendEmailWithFileUsingStream() throws IOException {
        File file = new File("C:/Users/HP/Desktop/Study Materials/Projects/Email-Sender-App/Backend/spring-mailer/src/main/resources/static/Snowflake Certificate_page-0001.jpg");

        try {
            InputStream is=new FileInputStream(file);

            emailService.sendEmailWithFile("shadabfaisal91@gmail.com",
                    "Email with File",
                    "This email contains a file that is sent using SpringBoot.",is);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
