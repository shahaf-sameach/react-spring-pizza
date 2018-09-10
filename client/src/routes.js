import React from 'react'
import { Route, Switch } from 'react-router'
import LoginComponent from './components/login/login.component'
import OrderComponent from './components/order/order.component'

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/order" component={OrderComponent} />
            <Route component={LoginComponent} />
        </Switch>
    </div>
)

export default routes