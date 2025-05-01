package com.springboot.spring_mailer.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public interface EmailService {

    void sendEmail(String to, String subject, String message);

    void sendEmail(String[] to, String subject, String message);

    void sendEmailWithHtml(String to, String subject, String htmlContent);

    void sendEmailWithFile(String to, String subject, String message, File file);

    void sendEmailWithFile(String to, String subject, String message, InputStream is) throws IOException;
}
