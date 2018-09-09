import React from "react";
import axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class ReactForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '0',
            location: '0'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState, () => console.log(this.state))
    }



    handleSubmit = (e) => {
        e.preventDefault();
        let { type, location } = this.state;
        console.log(this.state)
        var that = this;
        axios.post('http://localhost:8080/api/order/create', {type, location})
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
                        value={this.state.type}
                        disabled={this.props.disable}
                        onChange={this.handleChange}>
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
                        value={this.state.location}
                        disabled={this.props.disable}
                        onChange={this.handleChange}>
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

var formStyle = {
    width: '200px',
    padding: '20px'
};

