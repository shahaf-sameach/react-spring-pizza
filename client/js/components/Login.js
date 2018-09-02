import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            showWrongCredsMessage: false
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        this.setState({showWrongCredsMessage: false})
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username == "user" && this.state.password == "1234") {
            this.props.history.push("/order");
        }
        else {
            this.setState({showWrongCredsMessage: true})
        }
    }


    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="small">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="small">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}/>
                    </FormGroup>
                    <Button
                        block
                        bsSize="small"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                </form>
                { this.state.showWrongCredsMessage ?
                    "Invalid creds" : null
                }
            </div>
        );
    }
}