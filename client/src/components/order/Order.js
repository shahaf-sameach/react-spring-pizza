import React, {Component} from "react";
import Form from "../form/Form";
import ProgrssBar from "../progressBar/ProgressBar.component";
import {Button} from "react-bootstrap";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: '',
            bar: false,
            formDisable: false
        }

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState(state => ({
            formDisable: !state.formDisable,
            bar: false,
            new_order: false
        }));
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
            <div className="Order">
                <h2 style={{padding: '20px'}}>Place your Order</h2>
                <Form handleFormSubmit={this.handleFormSubmit.bind(this)} disable={this.state.formDisable}/>
                <hr/>
                { this.state.bar ?
                    <ProgrssBar
                        order_id={this.state.order_id}
                        handleOrderDeliverd={this.handleOrderDeliverd.bind(this)}/>
                    : null
                }
                { this.state.new_order ?
                    <Button
                        disabled={this.props.disable}
                        bsSize="small"
                        onClick={this.toggleForm.bind(this)}>
                        New Order
                    </Button> : null
                }
            </div>
        )
    }
}




export default Order


