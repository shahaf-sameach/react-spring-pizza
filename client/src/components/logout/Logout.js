import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { push } from "connected-react-router"
import { Button } from "react-bootstrap"


class LogoutComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    handleSubmit = () => {
        axios.get('http://localhost:8080/api/logout')
            .then(function () {
                console.log("logout");
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.backToLogin()
    }


    render() {
        return (
            <div className="Logout" style={style}>
                <Button
                    block
                    bsSize="small"
                    onClick={() => this.handleSubmit()}>
                    Logout
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        backToLogin: () => {
            dispatch(push('/login'))
        }
    };
};

export default connect(null, mapDispatchToProps)(LogoutComponent);

var style = {
    width: '100px',
    padding: '20px',
    float: 'right',
    right: '0px'
}
