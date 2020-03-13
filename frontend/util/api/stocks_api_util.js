// Fetch a quote from the IEX API
export const fetchQuote= (ticker) => {
    return $.ajax({
        method: 'GET',
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_545bae65d6a44dc68f94a686faf6a05a`
    });
};

// Each of these methods sends an http request using jquery's ajax method to the rails api.

// GET request for collection of all stocks belonging to user.
export const fetchUserStocks = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${id}/stocks`
    });
};

// POST request to create a new stock.
// stock should be json object containing ticker, shares, and owner_id keys.
export const createStock = (stock) => {
    return $.ajax({
        method: 'POST',
        url: `api/users/${stock.owner_id}/stocks`,
        data: { stock: stock }
    });
};

