import React from "react";
import { Route } from 'react-router-dom';
import Order from "./order/Order";
import LoginComponent from "./login/login.component";


const App = () => {
    <div>
        <main>
            <Route exact path="/" component={LoginComponent}/>
            <Route exact path="/order" component={Order} />
        </main>
    </div>
}

export default App