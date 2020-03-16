// Fetch a quote from the IEX API
export const fetchQuote= (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_545bae65d6a44dc68f94a686faf6a05a`
    });
};

//Fetch batch of quotes for multiple symbols from the IEX API
// Stocks should be an array of objects each with a ticker key corresponding to stock's ticker
export const fetchBatch = (stocks) => {
    const tickerString = stocks.map(stock => stock.ticker).join(',');
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/market/batch?types=quote&symbols=${tickerString}&token=Tpk_545bae65d6a44dc68f94a686faf6a05a`
    })
}