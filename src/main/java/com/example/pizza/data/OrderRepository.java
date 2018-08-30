package com.example.pizza.data;

import com.example.pizza.consts.OrderState;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.LinkedHashMap;

@Repository
public class OrderRepository {

    private LinkedHashMap<Long, Order> orders = new LinkedHashMap<>();
    private long lastId = 0;

    synchronized public Order insert(Order order) {
        Order ord = new Order(order);
        ord.setId(lastId);

        while (orders.containsKey(ord.getId()))
            ord.setId(++lastId);

        orders.put(ord.getId(), ord);
        lastId += 1;

        return ord;
    }

    public Order get(long id){
        return orders.get(id);
    }

    public OrderState getState(long id){
        Order order = orders.get(id);

        if (order == null)
            return null;

        return order.getState();

    }

    synchronized public long setState(long id, OrderState state){
        Order order = orders.get(id);

        if ((order == null) || (order.getState() == OrderState.Delivered))
            return -1;

        order.setState(state);
        return id;
    }


    public Collection<Order> getAll() {
        return this.orders.values();
    }
}
