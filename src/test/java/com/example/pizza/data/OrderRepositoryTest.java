package com.example.pizza.data;

import com.example.pizza.consts.Location;
import com.example.pizza.consts.OrderState;
import com.example.pizza.consts.PizzaType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;
import java.util.LinkedHashMap;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderRepositoryTest {

    @Autowired
    OrderRepository repository;

    @Test
    public void testInsert() {
        Order order = new Order();
        order.setId(190);
        order.setState(OrderState.Baking);
        order.setType(PizzaType.Margarita);
        order.setLocation(Location.Allenby);

        Order order1 = repository.insert(order);

        assertThat(order1.getId()).isEqualTo(0);
        assertThat(order1.getState()).isEqualTo(OrderState.Processing);
        assertThat(order1.getLocation()).isEqualTo(order.getLocation());
        assertThat(order1.getType()).isEqualTo(order.getType());
        Order order2 = repository.insert(order);
        assertThat(order2.getId()).isEqualTo(1);

    }

    @Test
    public void testGet() {
        Order order = new Order();
        order.setId(190);
        order.setState(OrderState.Baking);
        order.setType(PizzaType.Margarita);
        order.setLocation(Location.Allenby);

        repository.insert(order);

        Order order1 = repository.get(0);
        assertThat(order1.getId()).isEqualTo(0);
        assertThat(order1.getState()).isEqualTo(OrderState.Processing);
        assertThat(order1.getLocation()).isEqualTo(order.getLocation());
        assertThat(order1.getType()).isEqualTo(order.getType());

    }


    @Test
    public void testGetAll() {
        for(int i=0; i<5;i++)
            repository.insert(new Order());

        Collection<Order> orders = repository.getAll();

        assertThat(orders.size()).isEqualTo(5);
    }


}
