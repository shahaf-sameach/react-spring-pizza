import React from "react";
import ReactDOM from "react-dom";
import { ProgressBar } from 'react-bootstrap';

class ReactProgressBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <ProgressBar>
                    <ProgressBar striped bsStyle="success" now={35} key={1} />
                    <ProgressBar bsStyle="warning" now={20} key={2} />
                    <ProgressBar active bsStyle="danger" now={10} key={3} />
                </ProgressBar>
            </div>
    )
    }
}

class ReactFoo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>dddd</div>
    )
    }
}

const app = document.getElementById('app');
ReactDOM.render(<ReactProgressBar />, app);