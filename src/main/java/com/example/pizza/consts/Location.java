package com.example.pizza.consts;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Location {
    Nordau(18), Allenby(13), Dizengoff(10) ,Bugrashov(8);

    private final int duration;

    Location(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return this.duration;
    }

//    @JsonValue
//    public int toValue() {
//        return ordinal();
//    }

}
