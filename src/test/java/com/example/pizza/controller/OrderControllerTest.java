package com.example.pizza.controller;


import com.example.pizza.consts.Location;
import com.example.pizza.consts.OrderState;
import com.example.pizza.consts.PizzaType;
import com.example.pizza.data.Order;
import com.example.pizza.data.OrderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.internal.matchers.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.stream.IntStream;
import java.util.stream.Stream;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    OrderRepository repository;

    @Before
    public void clearDB() {
        repository.clear();
    }

    @Test
    public void test() throws Exception {
        this.mockMvc.perform(post("/api/order/create")).andDo(print()).andExpect(status().isUnauthorized());
    }

    @Test
    public void test2() throws Exception {
        this.mockMvc.perform(get("/api/order/get")).andDo(print()).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void test3() throws Exception {
        Order order = new Order();
        order.setLocation(Location.Allenby);
        order.setType(PizzaType.Margarita);
        ObjectMapper mapper = new ObjectMapper();
        String jsonOrder = mapper.writeValueAsString(order);

        this.mockMvc.perform(post("/api/order/create").content(jsonOrder).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(0)))
                .andExpect(jsonPath("$.location", is(order.getLocation().toString())))
                .andExpect(jsonPath("$.state", is(OrderState.Processing.toString())))
                .andExpect(jsonPath("$.type", is(order.getType().toString())));


    }

    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void test4() throws Exception {
        Order order = new Order();
        order.setId(190);
        order.setState(OrderState.Baking);
        order.setType(PizzaType.Margarita);
        order.setLocation(Location.Allenby);

        repository.insert(order);


        this.mockMvc.perform(get("/api/order/get").param("id", "0"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(0)))
                .andExpect(jsonPath("$.location", is(order.getLocation().toString())))
                .andExpect(jsonPath("$.state", is(OrderState.Processing.toString())))
                .andExpect(jsonPath("$.type", is(order.getType().toString())));


    }

    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void test5() throws Exception {
        Order order = repository.insert(new Order(Location.Allenby, PizzaType.Margarita));

        this.mockMvc.perform(get("/api/order/get").param("id", "0"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(0)))
                .andExpect(jsonPath("$.location", is(order.getLocation().toString())))
                .andExpect(jsonPath("$.state", is(OrderState.Processing.toString())))
                .andExpect(jsonPath("$.type", is(order.getType().toString())));

        for (OrderState state : OrderState.values()){
            order.setState(state);
            this.mockMvc.perform(get("/api/order/get").param("id", "0"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.state", is(state.toString())));
        }
    }


    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void test6() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // Create Orders as [Processing, Processing, Processing, Processing, Processing]
        Stream.generate(() -> new Order())
                .limit(5).forEach(order -> {
            try {
                this.mockMvc.perform(post("/api/order/create")
                .content(mapper.writeValueAsString(new Order())).contentType(MediaType.APPLICATION_JSON));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check all orders are as [Processing, Processing, Processing, Processing, Processing]
        IntStream.range(0,5).forEach(i -> {
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(OrderState.Processing.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check all orders are as [Preparing, Preparing, Preparing, Preparing, Preparing]
        Thread.sleep(4000);
        IntStream.range(0,5).forEach(i -> {
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(OrderState.Preparing.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check all orders are as [Baking, Baking, Baking, Baking, Baking]
        Thread.sleep(4000);
        IntStream.range(0,5).forEach(i -> {
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(OrderState.Baking.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check orders are as [Packaging, Packaging, Baking, Baking, Baking]
        Thread.sleep(7000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = OrderState.Baking;
            if (i < 2)
                state = OrderState.Packaging;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });


        // Check orders are as [Delivering, Delivering, Packaging, Packaging, Baking]
        Thread.sleep(7000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = OrderState.Baking;
            if (i < 2)
                state = OrderState.Delivering;
            else if ((i >= 2) && (i < 4))
                state = OrderState.Packaging;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });


        // Check orders are as [Delivering, Delivering, Delivering, Delivering, Packaging]
        Thread.sleep(7000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = state = OrderState.Delivering;
            if (i > 3)
                state = OrderState.Packaging;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });


        // Check orders are as [Delivered, Delivered, Delivering, Delivering, Delivering]
        Thread.sleep(7000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = state = OrderState.Delivering;
            if (i < 2)
                state = OrderState.Delivered;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check orders are as [Delivered, Delivered, Delivered, Delivered, Delivering]
        Thread.sleep(9000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = state = OrderState.Delivered;
            if (i > 3)
                state = OrderState.Delivering;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        // Check orders are as [Delivered, Delivered, Delivered, Delivered, Delivering]
        Thread.sleep(3000);
        IntStream.range(0,5).forEach(i -> {
            OrderState state = state = OrderState.Delivered;
            try {
                this.mockMvc.perform(get("/api/order/get").param("id", Integer.toString(i)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.state", is(state.toString())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
