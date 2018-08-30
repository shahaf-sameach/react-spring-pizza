import React from "react";
import { ProgressBar } from 'react-bootstrap';

export default class ReactProgressBar extends React.Component {
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
    }

    preparingBar() {
        const processing = this.state.processing;
        processing.active = "";
        processing.style = "success";

        const preparing = this.state.preparing;
        preparing.complete = 20;
        this.setState({processing, preparing});
    }

    bakingBar() {
        const preparing = this.state.preparing;
        preparing.active = "";
        preparing.style = "success";

        const baking = this.state.baking;
        baking.complete = 20;
        this.setState({preparing, baking});
    }

    packagingBar() {
        const baking = this.state.baking;
        baking.active = "";
        baking.style = "success";

        const packaging = this.state.packaging;
        packaging.complete = 20;
        this.setState({packaging, baking});
    }

    deliveringBar() {
        const packaging = this.state.packaging;
        packaging.active = "";
        packaging.style = "success";

        const delivering = this.state.delivering;
        delivering.complete = 20;
        this.setState({packaging, delivering});
    }

    deliveredBar() {
        const delivering = this.state.delivering;
        delivering.active = "";
        delivering.style = "success";
        this.setState({delivering});
    }

    render() {
        setTimeout(() => { this.preparingBar() }, 2000);
        setTimeout(() => { this.bakingBar() }, 4000);
        setTimeout(() => { this.packagingBar() }, 6000);
        setTimeout(() => { this.deliveringBar() }, 8000);
        setTimeout(() => { this.deliveredBar() }, 10000);
        return(
            <div>
                <ProgressBar>
                    <ProgressBar active={this.state.processing.active} striped bsStyle={this.state.processing.style} now={this.state.processing.complete} key={1} label={"processing"} />
                    <ProgressBar active={this.state.preparing.active} striped bsStyle={this.state.preparing.style} now={this.state.preparing.complete} key={2} label={"preparing"}/>
                    <ProgressBar active={this.state.baking.active} striped bsStyle={this.state.baking.style} now={this.state.baking.complete} key={3} label={"baking"} />
                    <ProgressBar active={this.state.packaging.active} striped bsStyle={this.state.packaging.style} now={this.state.packaging.complete} key={4} label={"packaging"} />
                    <ProgressBar active={this.state.delivering.active} striped bsStyle={this.state.delivering.style} now={this.state.delivering.complete} key={5} label={"delivering"} />
                </ProgressBar>
            </div>
    )
    }
}

