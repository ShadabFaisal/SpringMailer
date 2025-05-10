package com.springboot.spring_mailer.controllers;

import com.springboot.spring_mailer.entities.CustomResponse;
import com.springboot.spring_mailer.entities.EmailRequest;
import com.springboot.spring_mailer.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/email")
@CrossOrigin("*")
public class EmailController {

    private EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<CustomResponse> sendEmail(@RequestBody EmailRequest request){
        emailService.sendEmailWithHtml(request.getTo(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok(
                CustomResponse.builder().message(
                        "Email sent successfully!!!"
                ).httpStatus(HttpStatus.OK).success(true).build()
        );
    }

    @PostMapping("/send-with-file")
    public ResponseEntity<CustomResponse> sendEmailWithAttachment(@RequestPart EmailRequest request, @RequestPart MultipartFile file) throws IOException {
            emailService.sendEmailWithFile(request.getTo(), request.getSubject(), request.getMessage(), file.getInputStream());
            return ResponseEntity.ok(
                CustomResponse.builder().message(
                        "Email sent successfully!!!"
                ).httpStatus(HttpStatus.OK).success(true).build()
        );
    }

}
