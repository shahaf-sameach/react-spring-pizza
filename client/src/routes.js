import React from 'react'
import { Route, Switch } from 'react-router'
import LoginComponent from './components/login/login.component'
import Order from './components/order/Order'

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/order" component={Order} />
            <Route component={LoginComponent} />
        </Switch>
    </div>
)

export default routes