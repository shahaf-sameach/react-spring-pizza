import React from "react";
import axios from "axios";

class ReactFormLabel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}

export default class ReactForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '0',
            location: '0'
        }
        this.state.disabled = props.disable


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
    }



    handleSubmit = (e) => {
        e.preventDefault();
        let { type, location } = this.state;
        console.log(this.state)
        var that = this;
        axios.post('http://localhost:8080/order/create', {type, location})
        .then(function (response) {
            console.log(response);
            console.log(response.data.id)
            that.props.handleFormSubmit(response.data.id)
            that.setState({disabled: true})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return(
            <form className='react-form' onSubmit={this.handleSubmit}>
                <h2>Place your Order</h2>

                <fieldset disabled={this.state.disabled} className='form-group'>
                    <ReactFormLabel htmlFor='formType' title='Type:' />
                    <select value={this.state.type} onChange={this.handleChange}>
                        <option value="0">Margarita</option>
                        <option value="1">Pomodoro</option>
                        <option value="2">Peperoni</option>
                        <option value="3">White</option>
                    </select>
                </fieldset>

                <fieldset disabled={this.state.disabled} className='form-group'>
                    <ReactFormLabel htmlFor='formLocation' title='Location:' />
                    <select value={this.state.location} onChange={this.handleChange}>
                        <option value="0">Nordau</option>
                        <option value="1">Allenby</option>
                        <option value="2">Dizengoff</option>
                        <option value="3">Bugrashov</option>
                    </select>
                </fieldset>

                <div className='form-group'>
                    <input disabled={this.state.disabled} id='formButton' className='btn' type='submit' placeholder='Send message' />
                </div>
            </form>
        )
    }
}

