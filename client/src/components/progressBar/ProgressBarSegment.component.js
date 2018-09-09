import React from "react";
import { ProgressBar } from 'react-bootstrap';
import {connect} from "react-redux";
import { updateProgresBar } from "./progressBar.actions";


class ReactProgressBarSegment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {complete: 0, active: true, striped: "stripped", style: "warning", label: ""}
    }

    setProcessing() {
        this.setState({complete: 20, label: props.label})
    }

    setDone() {
        this.setProcessing()
        this.setState({active: false, style: "success"})
    }


    render() {
        return(
            <ProgressBar active={this.state.active} {"stripped"} bsStyle={this.props.style} now={this.state.complete} label={this.state.label} />
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
        updateProgress: (msg) => {
            // debugger
            dispatch(updateProgresBar(msg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactProgressBarSegment);


