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

    public Collection<Order> getAll() {
        return this.orders.values();
    }

    public void clear() {
        orders.clear();
        lastId = 0;
    }
}
