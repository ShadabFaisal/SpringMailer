package com.springboot.spring_mailer.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@Builder
public class CustomResponse {

    private String message;

    private HttpStatus httpStatus;

    private boolean success=false;
}
