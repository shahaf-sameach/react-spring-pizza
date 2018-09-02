import React from "react";
import { Route } from 'react-router-dom';


import Footer from "./Footer";
import Header from "./Header";
import Order from "./Order";
import Login from "./Login";

export default class Layout extends React.Component {
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
                <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
                <Route path="/order" component={Order}/>
                <Route exact path="/" component={Login}/>
                {/*<Route path="/" component={Login}>*/}
                    {/*<IndexRedirect to="/login" />*/}
                    {/*<Route path="/order" component={Order} />*/}
                {/*</Route>*/}
                <Footer />
            </div>
    );
    }
}