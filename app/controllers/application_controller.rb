class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?

    # Sets @current_user instance variable if it has not already been set by looking up user in db with session token matching the token in the session cookie.
    # Returns @current_user.
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
        return @current_user
    end

    # Determines if a user is currently logged in.
    # Returns false if @current_user is nil, true otherwise.
    def logged_in?
        !!current_user
    end

    # Resets the session token of the given user, then sets the session cookie's session token to be that user's new session token.
    def log_user_in!(user)
        user.reset_session_token!
        session[:session_token] = user.session_token
    end

    # Resets the session token of @current_user, then sets the session cookie's session token to be nil.
    def log_user_out!
        current_user.reset_session_token!
        session[:session_token] = nil
    end

end
