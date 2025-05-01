package com.springboot.spring_mailer.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder

public class EmailRequest {

    private String to;

    private String subject;

    private String message;
}
