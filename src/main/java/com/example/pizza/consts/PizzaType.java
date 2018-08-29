package com.example.pizza.consts;

public enum PizzaType {
    Margarita(7), Pomodoro(7), Peperoni(8), White(12);


    private final int duration;

    PizzaType(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return this.duration;
    }

}
