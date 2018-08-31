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
            type: '',
            location: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
    }


    handleSubmit = (e, message) => {
        e.preventDefault()

        let formData = {
            formType: this.state.type,
            formLocation: this.state.location
        }

        axios.post('http://localhot:8080/order/create', {
            type: this.state.type,
            location: this.state.location
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            type: '',
            location: ''
        })
    }

    render() {
        return(
            <form className='react-form' onSubmit={this.handleSubmit}>
                <h1>Say Hi!</h1>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formType' title='Type:' />
                    <select value={this.state.type} onChange={this.handleChange}>
                        <option value="0">Margarita</option>
                        <option value="1">Pomodoro</option>
                        <option value="2">Peperoni</option>
                        <option value="3">White</option>
                    </select>
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formLocation' title='Location:' />
                    <select value={this.state.location} onChange={this.handleChange}>
                        <option value="0">Nordau</option>
                        <option value="1">Allenby</option>
                        <option value="2">Dizengoff</option>
                        <option value="3">Bugrashov</option>
                    </select>
                </fieldset>

                <div className='form-group'>
                    <input id='formButton' className='btn' type='submit' placeholder='Send message' />
                </div>
            </form>
        )
    }
}

