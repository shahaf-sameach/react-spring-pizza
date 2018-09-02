package com.example.pizza.controller;

import com.example.pizza.data.Order;
import com.example.pizza.data.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderRepository repository;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Order order) {
        return orderResponse(repository.insert(order));
    }

    @GetMapping("/get")
    public ResponseEntity get(@RequestParam("id") long id) {
        return orderResponse(repository.get(id));
    }

    private ResponseEntity orderResponse(Order order) {
        if (order == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
