import React, {Component} from "react";
import Form from "./Form";
import ProgrssBar from "./ProgressBar";
import axios from "axios";
import _ from "lodash";

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            location: '',
            orders: []
        }
    }

    changeTypeAndLocation(type, location) {
        this.setState({type, location});
    }

    handleSubmit() {
        let {type, location} = this.state;
        axios.post('localhost:8090/order/create', {type, location})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        let orders = _.cloneDeep(this.state.orders);
        orders.push(`${type}${location}`);
        this.setState({orders});
    }

    render() {
        return (
            <div>
                <Form type={this.state.type}
                      location={this.state.location}
                      changeTypeAndLocation={this.changeTypeAndLocation.bind(this)}/>
                {
                    this.state.orders.map((order) => {
                       return <ProgrssBar/>
                    });
                }
            </div>
        );
    }
}
