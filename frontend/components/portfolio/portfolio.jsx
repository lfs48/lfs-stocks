import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useInterval} from '../../util/hooks/hooks';
import {merge} from 'lodash';
import {fetchQuote, fetchBatch} from '../../util/api/iex_api_util';
import {fetchUser} from '../../actions/entities/user_actions';
import {fetchUserStocks} from '../../actions/entities/stock_actions';
import {createTransaction} from '../../actions/entities/transaction_actions'

const Portfolio = () => {

    const [state, setState] = useState({
        ticker: "",
        quantity: "",
    });

    const [value, setValue] = useState(0);

    const [stockState, setStockState] = useState({});

    const [update, doUpdate] = useState(0);

    useInterval( () => {
        doUpdate(update+1)
    }, 1000);

    const dispatch = useDispatch();

    const {stocks, currentUser} = useSelector(
        state => ({
            currentUser: state.entities.users[state.sessions.id],
            stocks: Object.values(state.entities.stocks) || []
        })
    );

    useEffect( () => {
        dispatch(fetchUserStocks(currentUser.id))
    },
    []);

    useEffect( () => {
        fetchBatch(stocks)
        .then( (res) => {
            const stocksArr = [];
            Object.values(res).forEach( (stock) => stocksArr.push({ticker: stock.quote.symbol, open: stock.quote.open, price: stock.quote.latestPrice}) );
            updateStocks(stocksArr);
            let value = stocksArr.reduce( (acc, stock) => acc + stock.price , 0 );
            value = value.toFixed(2);
            setValue(value);
        })
    },
    [update]);

    const updateInput = (e, field) => {
        e.preventDefault();
        const newState = merge({}, state);
        newState[field] = e.target.value;
        setState(newState);
    }

    const updateStocks = (stocksArr) => {
        const newState = merge({}, stockState);
        stocksArr.forEach( (stock) =>
            newState[stock.ticker] = {open: stock.open, price: stock.price}
        );
        setStockState(newState);
    }

    const handleBuy = (e) => {
        e.preventDefault();
        console.log(stocks);
        fetchQuote(state.ticker)
        .then( quote => {
            console.log(quote);
            const transaction = {
                purchaser_id: currentUser.id,
                ticker: state.ticker,
                quantity: state.quantity,
                price: quote.latestPrice
            };
            dispatch(createTransaction(transaction))
            .then( () =>
                dispatch(fetchUser(currentUser.id))
            )
            .then( () =>
                dispatch(fetchUserStocks(currentUser.id))
            );
        });
    }

    const lis = stocks.filter(stock => stock.owner_id === currentUser.id).map( (stock) => {
        return(
            <li className={`stock-li ${stock.ticker in stockState && (stockState[stock.ticker].price >= stockState[stock.ticker].open) ? "upStock" : "downStock"}`} key={stock.id}>
                <span>{stock.ticker} — {stock.shares} Shares</span>
                <span>{ stock.ticker in stockState ? `$${stockState[stock.ticker].price}` : "$?"}</span>
            </li>
        );
    });


    return(
        <section id="portfolio-container">

            <section id="owned-stocks-container">

            <header>Portfolio ${value}</header>

                <ul>
                    {lis}
                </ul>

            </section>

            <div id="portfolio-divider"></div>

            <section id="purchase-container">
            
            <header>Cash — ${currentUser.balance}</header>

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