// Each of these methods sends an http request using jquery's ajax method to the rails api.

// GET request for collection of all transactions belonging to user.
export const fetchUserTransactions = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${id}/transactions`
    });
};

// POST request to create a new stock.
// stock should be json object containing ticker, shares, and owner_id keys.
export const createTransaction = (transaction) => {
    return $.ajax({
        method: 'POST',
        url: `api/users/${transaction.purchaser_id}/transactions`,
        data: { transaction: transaction }
    });
};

