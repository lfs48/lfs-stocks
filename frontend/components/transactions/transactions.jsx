import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchUserTransactions } from '../../actions/entities/transaction_actions';

const Transactions = () => {

    const dispatch = useDispatch();

    const {transactions, currentUser} = useSelector(
        state => ({
            currentUser: state.entities.users[state.sessions.id],
            transactions: state.entities.transactions
        })
    )

    useEffect( () => {
        dispatch(fetchUserTransactions(currentUser.id))
    },
    []);

    const lis = Object.values(transactions).filter(transaction => transaction.purchaser_id === currentUser.id).map( (transaction) => {
        return(
            <li className="stock-li" key={transaction.id}>
                <span>BUY {transaction.ticker} — {transaction.quantity} Shares @ {transaction.price}</span>
            </li>
        );
    });


    return(
        <section id="transactions-container">

            <header>Transactions</header>

            <ul>
                {lis}
            </ul>

        </section>
    );
}

export default Transactions;