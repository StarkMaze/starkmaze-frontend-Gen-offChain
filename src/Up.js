import React from "react";
import Stopwatch from "./Stopwatch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { finished, redoMaze, resetMaze } from "./Tool";
import { toggleConfig } from "./Config";
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core";
import { Account, ButtonConnect, ButtonControl, TransactionManager } from "./Connect";


const connectors = getInstalledInjectedConnectors();

export function mazeRedo() {
    if (finished) {
        //change reset button to redo
        var redobtn = document.querySelector('#redo-reset-btn');
        redobtn.innerHTML = redobtn.innerHTML.substring(0, redobtn.innerHTML.length - 4) + "edo";
        
        resetMaze()
    } else {
        redoMaze()
    }
}

class Up extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback

        this.openConfig = this.openConfig.bind(this);
    }

    openConfig() {
        toggleConfig()
    }

    render() {
        return <StarknetProvider connectors={connectors}>
                <div className="up-div"></div>
                <ButtonConnect />
                <Account />
            
            {/* <div id="left">
                <button onClick={mazeRedo} id="redo-reset-btn" className="top-btn" type="button"><FontAwesomeIcon icon={faRefresh} /><u>R</u>edo</button>
            </div> */}
            {/* <div id="middle">
                <Stopwatch />
            </div> */}
            {/* <div id="right">
                <button onClick={this.openConfig} id="config-btn" className="top-btn" type="button"><FontAwesomeIcon icon={faGear} /><u>C</u>onfig</button>
            </div> */}
        </StarknetProvider>;
    }
}

export default Up;