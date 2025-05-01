package com.springboot.spring_mailer.entities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailRequest {

    private String to;

    private String subject;

    private String message;
}
