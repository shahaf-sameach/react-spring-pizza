package com.example.pizza.data;

import com.example.pizza.consts.Location;
import com.example.pizza.consts.OrderState;
import com.example.pizza.consts.PizzaType;

import java.util.Objects;

public class Order {

    private long id;
    private Location location;
    private PizzaType type;
    private OrderState state;
    private long stateTimeStamp;

    public Order() {

    }

    public Order(Location location, PizzaType type) {
        this.location = location;
        this.type = type;
        this.state = OrderState.Processing;
        this.stateTimeStamp = System.currentTimeMillis() / 1000L;
    }

    public Order(Order order) {
        this(order.getLocation(), order.getType());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public PizzaType getType() {
        return type;
    }

    public void setType(PizzaType type) {
        this.type = type;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
        this.stateTimeStamp = System.currentTimeMillis() / 1000L;;
    }

    public long getStateTimeStamp() {
        return stateTimeStamp;
    }

    public void setStateTimeStamp(long stateTimeStamp) {
        this.stateTimeStamp = stateTimeStamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id == order.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
