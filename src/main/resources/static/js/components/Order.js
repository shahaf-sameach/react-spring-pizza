import React, {Component} from "react";
import Form from "./Form";
import ProgrssBar from "./ProgressBar";
import axios from "axios";
import _ from "lodash";

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: '',
            bar: false,
            formDisable: false
        }
    }

    handleFormSubmit(order_id) {
        this.setState({order_id})
        this.setState({bar: true})
        this.setState({formDisable: true})
    }

    handleOrderDeliverd() {
        this.setState({new_order : true})
    }

    newOrderClick (e) {
        e.preventDefault();
        this.setState({bar: false})
        this.setState({new_order: false})
        this.setState({formDisable: false})
    }

    render() {
        return (
            <div>
                <Form handleFormSubmit={this.handleFormSubmit.bind(this)} disable={this.state.formDisable}/>
                { this.state.bar ?
                <div>
                    <ProgrssBar order_id={this.state.order_id} handleOrderDeliverd={this.handleOrderDeliverd.bind(this)}/>
                </div> : <div></div>
                }
                { this.state.new_order ?
                    <button onClick={this.newOrderClick.bind(this)}>
                        New Order
                    </button> : <div></div>
                }
            </div>
        );
    }
}
