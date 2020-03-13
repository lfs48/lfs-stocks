// Each of these methods sends an http request using jquery's ajax method to the rails api.

// GET request for a user by id.
// id should be an integer.
export const fetchUser = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${id}`
    });
};

// GET request for collection of all users.
export const fetchUsers = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/users'
    });
};

// POST request to create a new user.
// user should be json object containing username and password keys.
export const createUser = (user) => {
    return $.ajax({
        method: 'POST',
        url: 'api/users',
        data: { user: user }
    });
};