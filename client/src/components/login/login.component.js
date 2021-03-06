import React from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import { push } from 'connected-react-router'
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import {updatePassword, updateUsername} from './login.actions';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            showWrongCredsMessage: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validateForm() {
        return this.props.loginView.username.length > 0 && this.props.loginView.password.length > 0;
    }

    handleSubmit = () => {
        var that = this
        let {username, password} = this.props.loginView
        axios({
            method:'post',
            url:'/api/login',
            auth: {username, password}
        }).then(function (response) {
            if (response.status == 200) {
                that.props.changePageToOrder()
            }
            else {
                console.log(response);
            }
        }).catch(function (error) {
            that.setState({showWrongCredsMessage: true})
            console.log(error);
        });
    }

    render() {
        return (
            <div className="Login" style={loginStyle}>
                <form>
                    <FormGroup controlId="username" bsSize="small">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.loginView.username}
                            onChange={(e) => this.props.updateUsername(e)}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="small">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            onChange={(e) => this.props.updatePassword(e)}
                            value={this.props.loginView.password}/>
                    </FormGroup>
                    <Button
                        block
                        bsSize="small"
                        disabled={!this.validateForm()}
                        onClick={() => this.handleSubmit()}>
                        Login
                    </Button>
                </form>
                {this.state.showWrongCredsMessage ?
                    "Invalid creds" : null
                }
            </div>
        );
    }
}

var loginStyle = {
    width: '200px',
    padding: '20px',
    margin: 'auto'
};

const mapStateToProps = state => {
    return {
        loginView: state.loginReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (e) => {
            dispatch(updateUsername(e.target.value));
        },

        updatePassword: (e) => {
            dispatch(updatePassword(e.target.value));
        },

        changePageToOrder: () => {
            dispatch(push('/order'))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);