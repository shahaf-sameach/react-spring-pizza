package com.example.pizza.controller;

import com.example.pizza.data.Order;
import com.example.pizza.data.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private OrderRepository repository;

    @PostMapping("/login")
    public ResponseEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }

}
