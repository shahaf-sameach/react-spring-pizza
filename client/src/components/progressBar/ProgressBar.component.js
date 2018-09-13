import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { push } from "connected-react-router";

import { ProgressBar } from 'react-bootstrap';
import { updateProgressBar} from "./progressBar.actions";
import { updateButtonDisable, updateButtonLabel } from '../orderForm/OrderForm.actions'
import { UPDATE_INIT, UPDATE_PROCESSING, UPDATE_PREPARING, UPDATE_BAKING, UPDATE_PACKAGING, UPDATE_DELIVERING, UPDATE_DELIVERED } from './progressBar.actions'


class ReactProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state.pull = true
        this.state.labels = ['Processing','Preparing', 'Baking', 'Packaging', 'Delivering']

        this.done = this.done.bind(this)
        this.getStatus = this.getStatus.bind(this)
    }


    done () {
        this.setState({pull: false})
        this.props.updateDone()
    }

    getStatus () {
        var that = this
        if (this.state.pull) {
            axios.get('/api/order/get', {params: {id: this.props.order_id}})
                .then(function (response) {
                    if (response.status == 200) {
                        switch (response.data.state) {
                            case 'Processing':
                                that.props.updateProgress(UPDATE_PROCESSING)
                                break
                            case 'Preparing':
                                that.props.updateProgress(UPDATE_PREPARING)
                                break
                            case 'Baking':
                                that.props.updateProgress(UPDATE_BAKING)
                                break
                            case 'Packaging':
                                that.props.updateProgress(UPDATE_PACKAGING)
                                break
                            case 'Delivering':
                                that.props.updateProgress(UPDATE_DELIVERING)
                                break
                            case 'Delivered':
                                that.props.updateProgress(UPDATE_DELIVERED)
                                that.done()
                                break
                        }
                    } else if (response.status == 401){
                        that.props.backToLogin()
                    } else {
                        console.log(response)
                    }
                })
                .catch(function (error) {
                    that.props.backToLogin()
                });
        }
    }

    componentDidMount() {
        this.props.updateProgress(UPDATE_INIT)
        this.getStatus()
        this.interval = setInterval(() => this.getStatus(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div className="Progress" style={{padding: '20px'}}>
                <ProgressBar>
                    {
                        this.props.progressState.bars.map((bar, i) => [bar , this.state.labels[i]]).map((data, idx) =>
                            <ProgressBar key={idx} active={data[0].active} stripped bsStyle={data[0].style} now={data[0].complete} label={data[1]} srOnly={data[0].srOnly} />)
                    }
                </ProgressBar>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        progressState: state.ProgressReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProgress: (msg) => {
            dispatch(updateProgressBar(msg));
        },

        updateDone: () => {
            dispatch(updateButtonLabel("New Order"))
            dispatch(updateButtonDisable(false))
        },
        backToLogin: () => {
            dispatch(push('/login'))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactProgressBar);


