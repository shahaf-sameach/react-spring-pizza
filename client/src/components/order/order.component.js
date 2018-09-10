import React, {Component} from "react"
import Form from "../form/OrderForm.component"
import ReactProgressBar from '../progressBar/ProgressBar.component'
import {connect} from "react-redux";
import {
    updateButtonDisable,
    updateButtonLabel,
    updateFormDisabled,
    updateLocation,
    updatePizzaType
} from "../form/OrderForm.actions";
import {push} from "connected-react-router";

class OrderComponent extends Component {
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
                <Form handleFormSubmit={this.handleFormSubmit.bind(this)} />
                <hr/>
                { this.props.orderState.progressVisible ?
                    <ReactProgressBar
                        order_id={this.state.order_id}
                        handleOrderDeliverd={this.handleOrderDeliverd.bind(this)}/>
                    : null
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        orderState: state.OrderReducer
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
        }
    };
};



export default connect(mapStateToProps, null)(OrderComponent);




