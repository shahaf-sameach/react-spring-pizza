package com.example.pizza.service;

import com.example.pizza.consts.OrderState;
import com.example.pizza.data.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Worker implements Runnable {
    private static final Logger logger = LoggerFactory.getLogger(Worker.class);

    private final Order order;
    private final int duration;

    public Worker(Order order, int duration) {
        this.order = order;
        this.duration = duration;
    }

    @Override
    public void run() {
        try {
            logger.info("starting " + order.getState().name() +" order " + order.getId() + " ...");
            Thread.sleep(this.duration * 1000);
            if (order.getState() == OrderState.Baking)
                order.setState(OrderState.Packaging);
            else if (order.getState() == OrderState.Delivering)
                order.setState(OrderState.Delivered);

            logger.info("finished " + order.getState().name() +" order " + order.getId());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
