import React from "react";
import { Route } from 'react-router-dom';
import Order from "./order/Order";
import LoginComponent from "./login/login.component";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome",
        };
    }

    changeTitle(title) {
        this.setState({title});
    }

    render() {
        return (
            <div>
                <Route path="/order" component={Order}/>
                <Route exact path="/" component={LoginComponent}/>
                {/*<Route path="/" component={Login}>*/}
                    {/*<IndexRedirect to="/login" />*/}
                    {/*<Route path="/order" component={Order} />*/}
                {/*</Route>*/}
                <footer></footer>
            </div>
    );
    }
}