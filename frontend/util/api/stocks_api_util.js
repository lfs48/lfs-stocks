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

