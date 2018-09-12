package com.example.pizza.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void authorizedWithCreds() throws Exception {
        this.mockMvc.perform(post("/api/login")).andDo(print()).andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", password = "password", roles = "USER")
    public void unauthorizedWithCredsAndGet() throws Exception {
        this.mockMvc.perform(get("/api/login")).andDo(print()).andExpect(status().isMethodNotAllowed());
    }

    @Test
    public void unauthorizedWithNoCreds() throws Exception {
        this.mockMvc.perform(post("/api/login")).andDo(print()).andExpect(status().isUnauthorized());
    }

    @Test
    public void unauthorizedWithNoCredsAndGet() throws Exception {
        this.mockMvc.perform(get("/api/login")).andDo(print()).andExpect(status().isUnauthorized());
    }

}
