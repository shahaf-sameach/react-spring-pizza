import React, {Component} from "react"
import Form from "../orderForm/OrderForm.component"
import ReactProgressBar from '../progressBar/ProgressBar.component'
import {connect} from "react-redux";
import {
    updateButtonDisable,
    updateButtonLabel,
    updateFormDisabled,
    updateLocation,
    updatePizzaType
} from "../orderForm/OrderForm.actions";
import {push} from "connected-react-router";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { order_id: null }

    }


    handleFormSubmit(order_id) {
        this.setState({order_id})
    }

    render() {
        return (
            <div>
            <Header/>
            <div className="Order">

                <h2 style={{padding: '20px'}}>Place your Order</h2>
                <Form handleFormSubmit={this.handleFormSubmit.bind(this)} />
                <hr/>
                { this.props.orderState.progressVisible ?
                    <ReactProgressBar order_id={this.state.order_id}/> : null
                }

            </div>
            <Footer />
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




