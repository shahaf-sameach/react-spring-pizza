import React from "react";
import { ProgressBar } from 'react-bootstrap';
import axios from "axios";
import {connect} from "react-redux";
import {updateProgresBar} from "./progressBar.actions";
import {UPDATE_PROCESSING, UPDATE_PREPERING, UPDATE_BAKING, UPDATE_PACKAGING, UPDATE_DELIVERING, UPDATE_DELIVERED} from './progressBar.actions'


class ReactProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing:
                {complete: 20, active: "active", striped: "stripped", style: "warning"},
            preparing:
                {complete: 0, active: "active", striped: "stripped", style: "warning"},
            baking:
                {complete: 0, active: "active", striped: "stripped", style: "warning"},
            packaging:
                {complete: 0, active: "active", striped: "stripped", style: "warning"},
            delivering:
                {complete: 0, active: "active", striped: "stripped", style: "warning"}};
        this.state.order_id = props.order_id
        this.state.pull = true
        this.state.processing.label = "processing"
    }

    preparingBar() {
        const processing = this.state.processing;
        processing.active = "";
        processing.style = "success";

        const preparing = this.state.preparing;
        preparing.complete = 20;
        preparing.label = "preparing"
        this.setState({processing, preparing});
    }

    bakingBar() {
        this.preparingBar()
        const preparing = this.state.preparing;
        preparing.active = "";
        preparing.style = "success";

        const baking = this.state.baking;
        baking.complete = 20;
        baking.label = "baking"
        this.setState({preparing, baking});
    }

    packagingBar() {
        this.bakingBar()
        const baking = this.state.baking;
        baking.active = "";
        baking.style = "success";

        const packaging = this.state.packaging;
        packaging.complete = 20;
        packaging.label = "packaging"
        this.setState({packaging, baking});
    }

    deliveringBar() {
        this.packagingBar()
        const packaging = this.state.packaging;
        packaging.active = "";
        packaging.style = "success";

        const delivering = this.state.delivering;
        delivering.complete = 20;
        delivering.label = "delivering"
        this.setState({packaging, delivering});
    }

    deliveredBar() {
        this.deliveringBar()
        const delivering = this.state.delivering;
        delivering.active = "";
        delivering.style = "success";
        this.setState({delivering});
    }

    stopPulling() {
        this.state.pull = false
    }

    done () {
        this.deliveredBar()
        this.stopPulling()
        this.props.handleOrderDeliverd()
    }

    updateProgress() {

    }

    getStatus () {
        var that = this
        if (this.state.pull) {
            axios.get('http://localhost:8080/api/order/get', {params: {id: this.state.order_id}})
                .then(function (response) {
                    if (response.status == 200) {
                        switch (response.data.state) {
                            case 'Preparing':
                                that.props.updateProgress(UPDATE_PREPERING)
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
                                break
                        }
                    } else {
                        console.log('redirect')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getStatus(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div>
                <ProgressBar>
                    <ProgressBar active={this.state.processing.active} striped bsStyle={this.state.processing.style} now={this.state.processing.complete} key={1} label={this.state.processing.label} />
                    <ProgressBar active={this.state.preparing.active} striped bsStyle={this.state.preparing.style} now={this.state.preparing.complete} key={2} label={this.state.preparing.label}/>
                    <ProgressBar active={this.state.baking.active} striped bsStyle={this.state.baking.style} now={this.state.baking.complete} key={3} label={this.state.baking.label} />
                    <ProgressBar active={this.state.packaging.active} striped bsStyle={this.state.packaging.style} now={this.state.packaging.complete} key={4} label={this.state.packaging.label} />
                    <ProgressBar active={this.state.delivering.active} striped bsStyle={this.state.delivering.style} now={this.state.delivering.complete} key={5} label={this.state.delivering.label} />
                </ProgressBar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        progress: state.ProgressReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProgress: (type) => {
            dispatch(updateProgresBar(type));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactProgressBar);


