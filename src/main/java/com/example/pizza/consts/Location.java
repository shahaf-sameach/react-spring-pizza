package com.example.pizza.consts;

public enum Location {
    Nordau(18), Allenby(13), Dizengoff(10) ,Bugrashov(8);

    private final int duration;

    Location(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return this.duration;
    }

}
