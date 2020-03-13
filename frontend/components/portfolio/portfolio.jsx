import React, {useState} from 'react';
import {merge} from 'lodash';

const Portfolio = () => {

    const [state, setState] = useState({
        ticker: "",
        quantity: ""
    });

    const updateInput = (e, field) => {
        e.preventDefault();
        const newState = merge({}, state);
        newState[field] = e.target.value;
        setState(newState);
    }

    return(
        <section id="portfolio-container">

            <section id="purchase-container">
            <input 
                type="text" 
                id="ticker-input" 
                placeholder="Ticker"
                value={state.ticker}
                onChange={e => updateInput(e, "ticker")}
            ></input>

            <input 
                type="number" 
                id="qty-input" 
                placeholder="Quantity"
                value={state.quantity}
                onChange={e => updateInput(e, "quantity")}
            ></input>

            </section>
            

        </section>
    );
}

export default Portfolio;