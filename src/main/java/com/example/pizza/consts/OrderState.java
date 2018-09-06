package com.example.pizza.consts;

import com.fasterxml.jackson.annotation.JsonValue;

public enum OrderState {
    Processing, Preparing, Baking, Packaging, Delivering, Delivered;

//    @JsonValue
//    public int toValue() {
//        return ordinal();
//    }
}
