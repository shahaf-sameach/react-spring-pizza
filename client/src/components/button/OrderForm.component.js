import React from "react";
import axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {updateLocation, updatePizzaType} from "./OrderForm.actions";
import {push} from "connected-react-router";
import {connect} from "react-redux";


class OrderFormButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { username, location } = this.props.orderFormState;
        var that = this;
        axios.post('http://localhost:8080/api/order/create', {type: username, location})
        .then(function (response) {
            if (response.status == 200) {
                that.props.handleFormSubmit(response.data.id)
                that.setState({disabled: true})
            } else {
                console.log('redirect');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return(
            <form style={formStyle} className='react-form' onSubmit={this.handleSubmit}>
                <FormGroup controlId="type" bsSize="small">
                    <ControlLabel>Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        name="type"
                        value={this.props.orderFormState.username}
                        disabled={this.props.disable}
                        onChange={(e) => this.props.updateType(e)}>
                        <option value="0">Margarita</option>
                        <option value="1">Pomodoro</option>
                        <option value="2">Peperoni</option>
                        <option value="3">White</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="location" bsSize="small">
                    <ControlLabel>Location</ControlLabel>
                    <FormControl
                        componentClass="select"
                        name="location"
                        value={this.props.orderFormState.location}
                        disabled={this.props.disable}
                        onChange={(e) => this.props.updateLocation(e)}>
                        <option value="0">Nordau</option>
                        <option value="1">Allenby</option>
                        <option value="2">Dizengoff</option>
                        <option value="3">Bugrashov</option>
                    </FormControl>
                </FormGroup>

                <Button
                    disabled={this.props.disable}
                    bsSize="small"
                    type="submit"
                    placeholder='Send message'>
                    Place Order
                </Button>
            </form>
        )
    }
}


export default OrderFormButton;


