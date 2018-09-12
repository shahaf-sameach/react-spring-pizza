package com.example.pizza.service;

import com.example.pizza.data.Order;
import com.example.pizza.data.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Collection;

import static com.example.pizza.consts.OrderState.*;

@Service
public class PizzaFlowService {

    private static final Logger logger = LoggerFactory.getLogger(Worker.class);

    @Autowired
    private OrderRepository repository;

    @Autowired
    @Qualifier(value = "bakingTaskExecutor")
    private TaskExecutor bakingTaskExecutor;

    @Autowired
    @Qualifier(value = "deliveringTaskExecutor")
    private TaskExecutor deliveringTaskExecutor;

    private final long processingTime = 3;
    private final long preparingTime = 3;
    private final long packagingTime = 3;

    @Scheduled(fixedDelay = 200)
    public void processingOrder() {
        Collection<Order> orders = repository.getAll();
        for (Order order : orders){
            long diff = timeDiff(order);
            switch (order.getState()) {
                case Processing:
                    if (diff > processingTime) {
                        order.setState(Preparing);
                        logger.info("order["+ order.getId() +"]: " +  Preparing );
                    }
                    break;
                case Preparing:
                    if (diff > preparingTime) {
                        order.setState(Baking);
                        logger.info("order["+ order.getId() +"]: " +  Baking );
                        bakingTaskExecutor.execute(new Worker(order, order.getType().getDuration()));
                    }
                    break;
                case Packaging:
                    if (diff > packagingTime) {
                        order.setState(Delivering);
                        logger.info("order["+ order.getId() +"]: " +  Delivering );
                        deliveringTaskExecutor.execute(new Worker(order, order.getLocation().getDuration()));
                    }
                    break;
            }
        }
    }


    private long timeDiff(Order order){
        long currentTimeStamp = System.currentTimeMillis() / 1000L;
        return currentTimeStamp - order.getStateTimeStamp();
    }



}
