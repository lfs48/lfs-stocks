import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {merge} from 'lodash';
import {fetchQuote} from '../../util/api/stocks_api_util';
import {fetchUserStocks} from '../../actions/entities/stock_actions';
import {createTransaction} from '../../actions/entities/transaction_actions';

const Portfolio = () => {

    const [state, setState] = useState({
        ticker: "",
        quantity: ""
    });

    const dispatch = useDispatch();

    const {stocks, currentUser} = useSelector(
        state => ({
            stocks: state.entities.stocks,
            currentUser: state.entities.users[state.sessions.id]
        })
    )

    useEffect( () => {
        dispatch(fetchUserStocks(currentUser.id));
    },
    []);

    const updateInput = (e, field) => {
        e.preventDefault();
        const newState = merge({}, state);
        newState[field] = e.target.value;
        setState(newState);
    }

    const handleBuy = (e) => {
        e.preventDefault();
        fetchQuote(state.ticker)
        .then( quote => {
            console.log(quote);
            const transaction = {
                purchaser_id: currentUser.id,
                ticker: state.ticker,
                quantity: state.quantity,
                price: quote.latestPrice
            };
            dispatch(createTransaction(transaction));
        });
    }

    return(
        <section id="portfolio-container">

            <section id="purchase-container">
            <header>${currentUser.balance}</header>
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

            <button onClick={e => handleBuy(e)}>Buy</button>

            </section>
            

        </section>
    );
}

export default Portfolio;