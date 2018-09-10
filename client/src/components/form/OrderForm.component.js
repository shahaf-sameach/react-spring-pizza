import React from "react";
import axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {
    updateButtonDisable,
    updateButtonLabel,
    updateFormDisabled,
    updateLocation,
    updatePizzaType
} from "./OrderForm.actions";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import {updateProgressVisibility} from "../order/order.actions";

var formStyle = {
    width: '200px',
    padding: '20px'
}

class OrderForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateNewOrder = this.updateNewOrder.bind(this)
    }

    updateNewOrder() {
        this.props.updateFormDisabled(false)
        this.props.updateButtonLabel("Place Order")
        this.props.updateProgressVisible(false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.orderFormState.buttonLabel == "New Order"){
            this.updateNewOrder()
        } else {
            let { pizzaType, location } = this.props.orderFormState;
            console.log(pizzaType + " " + location)
            var that = this;
            axios.post('http://localhost:8080/api/order/create', {type: pizzaType, location})
                .then(function (response) {
                    if (response.status == 200) {
                        that.props.handleFormSubmit(response.data.id)
                        that.props.updateButtonDisable(true)
                        that.props.updateFormDisabled(true)
                        that.props.updateProgressVisible(true)
                    } else {
                        this.props.backToLogin();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
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
                        disabled={this.props.orderFormState.formDisabled}
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
                        disabled={this.props.orderFormState.formDisabled}
                        onChange={(e) => this.props.updateLocation(e)}>
                        <option value="0">Nordau</option>
                        <option value="1">Allenby</option>
                        <option value="2">Dizengoff</option>
                        <option value="3">Bugrashov</option>
                    </FormControl>
                </FormGroup>

                <Button
                    disabled={this.props.orderFormState.buttonDisable}
                    bsSize="small"
                    type="submit"
                    placeholder='Send message'>
                    {this.props.orderFormState.buttonLabel}
                </Button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderFormState: state.OrderFormReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: (e) => {
            dispatch(updateLocation(e.target.value));
        },

        updateType: (e) => {
            dispatch(updatePizzaType(e.target.value));
        },

        backToLogin: () => {
            dispatch(push('/login'))
        },
        updateButtonDisable: (bool) => {
            dispatch(updateButtonDisable(bool))
        },
        updateButtonLabel: (label) => {
            dispatch(updateButtonLabel(label))
        },
        updateFormDisabled: (bool) => {
            dispatch(updateFormDisabled(bool))
        },
        updateProgressVisible: (bool) => {
            dispatch(updateProgressVisibility(bool))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);


