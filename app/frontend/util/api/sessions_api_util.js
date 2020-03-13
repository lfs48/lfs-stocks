// Each of these methods sends an http request using jquery's ajax method to the rails api.

// POST request to log in a user by creating a new session.
// user should contain username and password keys.
export const login = (user) => {
    return $.ajax({
        method: "POST",
        url: 'api/session',
        data: {user: user}
    });
};

// DELETE request to log out a user by deleting an existing session.
export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: 'api/session',
    });
};