import React from "react";
import ReactDOM from "react-dom";

const reactFormContainer = document.querySelector('.react-form-container')

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

class ReactForm extends React.Component {
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

        axios.post('/user', {
            type: this.state,type,
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
                <option value="Margarita">Margarita</option>
                <option value="Pomodoro">Pomodoro</option>
                <option value="Peperoni">Peperoni</option>
                <option value="White">White</option>
            </select>
        </fieldset>

        <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formLocation' title='Location:' />
            <select value={this.state.location} onChange={this.handleChange}>
                <option value="Nordau">Nordau</option>
                <option value="Allenby">Allenby</option>
                <option value="Dizengoff">Dizengoff</option>
                <option value="Bugrashov">Bugrashov</option>
            </select>
        </fieldset>

        <div className='form-group'>
            <input id='formButton' className='btn' type='submit' placeholder='Send message' />
        </div>
        </form>
    )
    }
}

ReactDOM.render(<ReactForm />, reactFormContainer)